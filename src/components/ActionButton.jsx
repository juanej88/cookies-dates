import '../assets/styles/ActionButton.css';

const ActionButton = (props) => {
  return (
    <button id={props.id} className='action-btn' onClick={props.handleClick}>
      {props.children}
      <p></p>
    </button>
  );
};

export default ActionButton;