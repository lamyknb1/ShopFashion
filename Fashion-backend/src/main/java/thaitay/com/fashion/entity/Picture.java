package thaitay.com.fashion.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
@Entity
@Table(name = "PICTURE")
public class Picture {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "S_PICTURE")
    @SequenceGenerator(name = "S_PICTURE", sequenceName = "PICTURE_SEQ", allocationSize = 1)
    @Column(name = "PICTURE_ID")
    private Long pictureId;

    @NotBlank
    @Column(name = "SRC")
    private String src;

    @ManyToOne(fetch = FetchType.LAZY, cascade = {CascadeType.MERGE}, targetEntity = Product.class)
    @JoinColumn(name = "PRODUCT_ID")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Product product;

    public Picture() {
    }

    public Picture(Long pictureId, @NotBlank String src) {
        this.pictureId = pictureId;
        this.src = src;
    }

    public Long getPictureId() {
        return pictureId;
    }

    public void setPictureId(Long pictureId) {
        this.pictureId = pictureId;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
