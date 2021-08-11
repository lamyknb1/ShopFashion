package thaitay.com.fashion.entity;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "SIZES")
public class Sizes {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "S_SIZE")
    @SequenceGenerator(name = "S_SIZE", sequenceName = "SIZE_SEQ", allocationSize = 1)
    @Column(name = "SIZE_ID")
    private Long sizeId;

    @Column(name = "SIZE_NAME")
    private String sizeName;

    @OneToMany(mappedBy = "size",targetEntity = ProductDetail.class,
            cascade = {CascadeType.ALL},
            fetch = FetchType.EAGER)
    private List<ProductDetail> productDetails;

    public Sizes() {
    }

    public Sizes(Long sizeId, String sizeName) {
        this.sizeId = sizeId;
        this.sizeName = sizeName;
    }

    public Long getSizeId() {
        return sizeId;
    }

    public void setSizeId(Long sizeId) {
        this.sizeId = sizeId;
    }

    public String getSizeName() {
        return sizeName;
    }

    public void setSizeName(String sizeName) {
        this.sizeName = sizeName;
    }

//    public List<ProductDetail> getProductDetails() {
//        return productDetails;
//    }
//
    public void setProductDetails(List<ProductDetail> productDetails) {
        this.productDetails = productDetails;
    }
}
