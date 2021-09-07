package thaitay.com.fashion.config.dto;


import java.util.List;

public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private List<String> roles;
    private String username;


    public JwtResponse(String accessToken, List<String> roles, String username) {
        this.token = accessToken;
        this.roles = roles;
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
