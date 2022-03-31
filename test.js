const result = [
  {
    image:
      "https://www.ikea.com/sg/en/images/products/flintan-office-chair-beige__1007198_pe825954_s5.jpg?f=xxxs",
    price: 990000,
    productId: 5,
    productName: "Flintan",
    qtyAvailable: 20,
    qtyTotal: 20,
    size: null,
    variant: "White",
    variantId: 15,
    warehouseId: 1,
  },
  {
    image:
      "https://www.ikea.com/sg/en/images/products/flintan-office-chair-black__1007236_pe825956_s5.jpg?f=xxxs",
    price: 990000,
    productId: 5,
    productName: "Flintan",
    qtyAvailable: 20,
    qtyTotal: 20,
    size: null,
    variant: "Black",
    variantId: 16,
    warehouseId: 1,
  },
];

const functionFilter = () => {
  const results = result.map((value) => {
    return value.variant;
  });
  setColors(results);
};
functionFilter();
