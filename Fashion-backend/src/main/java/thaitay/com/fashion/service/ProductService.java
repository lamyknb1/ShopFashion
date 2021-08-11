package thaitay.com.fashion.service;

import org.springframework.data.domain.Page;
import thaitay.com.fashion.entity.Product;

import java.util.List;
import java.util.Optional;

public interface ProductService {

    Optional<Product> findById(Long productId);
    Iterable<Product> findAll();
    Product save(Product product);
    void delete(Long productId);
    Iterable<Product> findByName(String name);
    List<Product> findAllByCategory_CategoryId(Long categoryId);
    List<Product> findAllBySupplier_SupplierId(Long supplierId);
    Iterable<Product> findProductsByNameContaining(String name);

    List<Product> getAllWithPagination(int pageNo, int pageSize);
}
