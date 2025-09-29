export type Size = "S" | "M" | "L" | "XL";
export type Category = "Shirts" | "Trousers" | "Jackets" | "Accessories";

export interface Product {
  productId: string;     
  name: string;          
  cost: number;          
  availableSizes: Size[]; 
  type: Category;        
  quantityInStock: number;
  description?: string;   
  imageUrl?: string;      
}
