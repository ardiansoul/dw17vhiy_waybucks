import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { useQuery } from "react-query";
import { baseUrl } from "../Utils/API";
import ProductItem from "./ProductItem";

function ProductList() {
  const { isLoading, isError, error, data } = useQuery("products", () => {
    return Axios.get(`${baseUrl}api/v1/products`);
  });
  return (
    <>
      <div className="w-12/12 h-auto flex flex-wrap mt-4 justify-between">
        {isLoading ? (
          <FontAwesomeIcon icon={faSpinner} spin size="6x" />
        ) : isError ? (
          <div>{error}</div>
        ) : (
          data.data.data.products.map((product) => {
            return (
              <ProductItem
                key={product.id}
                id={product.id}
                photo={product.photo}
                name={product.name}
                price={product.price}
              />
            );
          })
        )}
      </div>
    </>
  );
}

export default ProductList;
