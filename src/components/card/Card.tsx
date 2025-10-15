import { ProductDetails } from "../../types/product";
import CardContent from "./CardContent";
import CardHeader from "./CardHeader";


interface CardProps {
  product: ProductDetails;
  onEdit: () => void;
}

const Card = ({ product, onEdit }: CardProps) => <div className="bg-white shadow rounded-lg overflow-hidden">
  <CardHeader name={product.name} number={product.number} onClick={onEdit} />
  <CardContent {...product} />
</div>

export default Card;