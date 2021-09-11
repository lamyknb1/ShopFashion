package thaitay.com.fashion.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import thaitay.com.fashion.config.dto.*;
import thaitay.com.fashion.config.security.JsonWebToken.common.JwtUtils;
import thaitay.com.fashion.config.security.services.UserDetailsImpl;
import thaitay.com.fashion.entity.Role;
import thaitay.com.fashion.entity.RoleName;
import thaitay.com.fashion.entity.User;
import thaitay.com.fashion.message.ResponseMessage;
import thaitay.com.fashion.repository.RoleRepository;
import thaitay.com.fashion.repository.UserRepository;
import thaitay.com.fashion.service.UserService;

import javax.validation.Valid;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

//end
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private RoleRepository roleRepository;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt, roles, userDetails.getUsername()));

    }

    @PostMapping("/signUp")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
                    HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpRequest.getName(),
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPhone(),
                signUpRequest.getAddress(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if(strRoles == null){
            Role role = roleRepository.findByRoleName(RoleName.ROLE_USER).
                    orElseThrow(() -> new RuntimeException("Loi: role is not found"));
            roles.add(role);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByRoleName(RoleName.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                        roles.add(adminRole);

                        break;
                    case "pm":
                        Role pmRole = roleRepository.findByRoleName(RoleName.ROLE_PM)
                                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                        roles.add(pmRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByRoleName(RoleName.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);
        return ResponseEntity.ok(new ResponseMessage("User registered successfully"));
    }

    @PutMapping("/update-profile/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserForm userForm,
                                        @PathVariable Long id,
                                        @RequestParam("file") MultipartFile file) {
        Optional<User> user = userService.findById(id);

        if(user == null) {
            return new ResponseEntity<>("Can't Find User By Id" + id, HttpStatus.BAD_REQUEST);
        }

        try {
            String avatar = StringUtils.cleanPath(file.getOriginalFilename());
            user.get().setName(userForm.getName());
            user.get().setAvatar(avatar);

            userService.save(user.get());

            String upLoadAvatar = "/avatar/" + user.get().getUserId();

            Path upLoadPath = Paths.get(upLoadAvatar);
            if (!Files.exists(upLoadPath)) {
                Files.createDirectories(upLoadPath);
            }
            InputStream inputStream = file.getInputStream();
            Path path = upLoadPath.resolve(avatar);
            Files.copy(inputStream, path, StandardCopyOption.REPLACE_EXISTING);

            return new ResponseEntity<>(new ResponseMessage("Update successful"), HttpStatus.OK);
        } catch (Exception e ) {
            throw new RuntimeException("Fail!");
        }
    }

    @PutMapping("/update-password/{id}")
    public ResponseEntity<?>updatePassword(@Valid @RequestBody PasswordForm passForm, @PathVariable Long id) {
        Optional<User> user = userService.findById(id);

        if (user == null) {
            return new ResponseEntity<>(new ResponseMessage("Not found user"), HttpStatus.NOT_FOUND);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(passForm.getUsername(), passForm.getCurrentPassword()));

            user.get().setPassword(encoder.encode(passForm.getNewPassword()));

            userService.save(user.get());

            return new ResponseEntity<>(new ResponseMessage("Change password successful"), HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException("Fail!");
        }
    }
}
