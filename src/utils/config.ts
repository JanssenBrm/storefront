import { useStoreon } from "..";
import { GET_STOREFRONT_CONFIG } from "../store/storefront/types";
import { debounce } from "./debounce";

export const getConfig = () => {
  const { dispatch, storefrontConfig } = useStoreon("storefrontConfig");
  if (!storefrontConfig) {
    debounce(GET_STOREFRONT_CONFIG, () => dispatch(GET_STOREFRONT_CONFIG), 150);
  }
};
