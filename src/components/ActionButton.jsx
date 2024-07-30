import '../assets/styles/ActionButton.css';

const ActionButton = (props) => {
  return (
    <button id={props.id} className={`action-btn ${props.className}`} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default ActionButton;