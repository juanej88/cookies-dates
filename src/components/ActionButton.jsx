import '../assets/styles/ActionButton.css';

const ActionButton = (props) => {
  return (
    <button className={`action-btn ${props.className}`} onClick={props.handleClick}>
      {props.children}
    </button>
  );
};

export default ActionButton;