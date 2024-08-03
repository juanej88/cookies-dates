import '../assets/styles/ActionButton.css';

const ActionButton = props => {
  const handleClick = event => {
    props.handleClick(event, props.data);
  };

  return (
    <button id={props.id} className={`action-btn ${props.className}`} onClick={handleClick}>
      {props.children}
    </button>
  );
};

export default ActionButton;