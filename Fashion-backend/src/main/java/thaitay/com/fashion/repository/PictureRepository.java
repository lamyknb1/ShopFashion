package thaitay.com.fashion.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import thaitay.com.fashion.entity.Picture;

@Repository
public interface PictureRepository extends JpaRepository<Picture, Long> {
}
