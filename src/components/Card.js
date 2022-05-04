import './Card.css'


function Card(props) {
  return (
    <div className="Card" 
        style={props.style}
        onClick={props.onClick}>
        <div className="CardText">
            {props.value ? props.value : "Card"}
        </div>
    </div>
  )
}

export default Card
