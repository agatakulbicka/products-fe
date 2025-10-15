import { ProductDetails } from "../../types/product";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";



const Card = ({ product }: ProductDetails) => <div className="bg-white shadow rounded-lg overflow-hidden">
  <CardHeader name={product.name} number={product.number} onClick={() => console.log('Edit Product')} />

  {/* Content */}
  <CardContent {...product} />
</div>

export default Card;