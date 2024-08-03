import '../assets/styles/DeleteEvent.css';

const DeleteEvent = props => { 
  return (
    <p>Once an event is deleted, it cannot be recovered. Are you sure you want to delete {props.data.name}?</p>
  );
};

export default DeleteEvent;