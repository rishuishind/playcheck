import Image from "next/image";

type Props = {
  img:string;
}

const ShoppingCard = (props: Props) => {
  return (
    <div className=" bg-gray-400 rounded-xl aspect-square">
      <Image src={props.img} alt="shoping-card" height={250} width={200}/>
    </div>
  )
}

export default ShoppingCard