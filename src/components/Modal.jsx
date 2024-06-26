import '../assets/styles/Modal.css';

const Modal = (props) => {
  // it hides the Modal component when a user clicks anywhere outside the form
  const handleExteriorClick = (e) => {
    if (e.target.getAttribute('id') === 'date-section') {
      props.toggleModal();
    };
  };

  return (
    <section id='date-section' onClick={handleExteriorClick}>
      <form id='date-form'>
        <h2>Add Date</h2>
      </form>
    </section>
  );
};

export default Modal;