import axios from "axios";

// API Login
export const api_login = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  //Save cookies
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api_login.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Terjadi kesalahan jaringan";
    return Promise.reject(new Error(msg));
  }
);

// ---------------------------------------

// API Register
export const api_register = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  //Save cookies
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api_register.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Terjadi kesalahan jaringan";
    return Promise.reject(new Error(msg));
  }
);

// ---------------------------------------

export const api_product = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getProducts(params: {
  sortBy: string;
  order: string;
  minPrice: string;
  maxPrice: string;
  limit: number;
  offset: number;
}) {
  const { sortBy, order, minPrice, maxPrice, limit, offset } = params;
  const res = await api_product.get(
    `/api/product/get?sortBy=${sortBy}&order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}&limit=${limit}&offset=${offset}`
  );
  return res.data;
}

// ---------------------------------------

export const api_productall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getProductsall() {
  const res = await api_productall.get(
    "/api/product/get"
  );
  return res.data;
}


// ---------------------------------------

export const api_allcartlastid = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getAllcartlastid() {
  const res = await api_allcartlastid.get("api/cart");
  const data = res.data;

  // 1 id teratas
  if (Array.isArray(data) && data.length > 0) {
    console.log("Last Order ID :", data[0].id);
  } else {
    console.log("Tidak ada data cart");
  }

  return data;
}

// ---------------------------------------

// Open new cart
export const api_createcart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function createNewcart() {
  const res = await api_createcart.post("api/cart");
  const data = res.data;

  if (data && data.id) {
    console.log("Created New Cart ID :", data.id);
  } else {
    console.log("Failed to create new cart");
  }

  return data;
}

// ---------------------------------------

export const api_createnameoncart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function createNewnameoncart(id: number, customerName: string) {
  const res = await api_createnameoncart.patch(`api/cart/${id}`, {
    customerName,
  });
  const data = res.data;

  return data;
}

// ---------------------------------------

export const api_addproductoncart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function addNewproductoncart(cartId: number, productId: number, quantity: number) {
  const res = await api_addproductoncart.post(`api/cart-item`, {
      cartId,
      productId,
      quantity,
    }
  );
  const data = res.data;

  return data;
}

// ---------------------------------------

export const api_getallcart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getAllcart() {
  const res = await api_allcartlastid.get("api/cart");
  const data = res.data;
  return data;
}

// ---------------------------------------

export const api_getallunpaidcart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getAllunpaidcart() {
  const res = await api_getallunpaidcart.get("api/unpaid-orders");
  const data = res.data;
  return data;
}

// ---------------------------------------

export const api_getallpaidcart = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getAllpaidcart() {
  const res = await api_getallpaidcart.get("api/paid-orders");
  const data = res.data;
  return data;
}

// ---------------------------------------

export const api_getcartbyid = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getCartbyid(customerNo: number) {
  const res = await api_getcartbyid.get(`api/cart/${customerNo}`);
  const data = res.data;
  return data;
}

// ---------------------------------------

export const api_deletecartbyid = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function deleteCartbyid(customerNo: number) {
  const res = await api_deletecartbyid.delete(`api/cart/${customerNo}`);
  console.log ("link : ", res);
  const data = res.data;
  return data;
}

// ---------------------------------------

export const api_confirmorder = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function addConfirmorder(cartId: number) {
  const payload = { cartId };
  console.log("Body yang dikirim ke API:", payload);

  const res = await api_confirmorder.post(
    "api/orders/from-cart",
    payload
  );

  console.log("Response:", res.status, res.data);
  return res.data;
}

// ---------------------------------------

export const api_getorderbyid = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export async function getOrderbyid(invoiceId: number) {
  const res = await api_getorderbyid.get(`api/orders/${invoiceId}`);
  const data = res.data;
  return data;
}