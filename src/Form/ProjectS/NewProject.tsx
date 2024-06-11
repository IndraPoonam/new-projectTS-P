import React, { Component, MouseEvent } from 'react';

interface NewProjectProps {}
interface NewProjectState {
  showToast: boolean;
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
}

export default class NewProject extends Component<NewProjectProps, NewProjectState> {
  constructor(props: NewProjectProps) {
    super(props);
    this.state = {
      showToast: false,
      showSuccessMessage: false,
      showErrorMessage: false,
    };
  }

  handleOpenClick = (): void => {
    this.setState((prevState) => ({ showToast: !prevState.showToast }));
  };

  handleConfirmClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log('Confirm button clicked');
    this.setState({ showSuccessMessage: true });

    setTimeout(() => {
      this.setState({ showSuccessMessage: false });
    }, 3000); 
  };

  handleCancelClick = (event: MouseEvent<HTMLButtonElement>): void => {
    console.log('Cancel button clicked');
    this.setState({ showErrorMessage: true });

    setTimeout(() => {
      this.setState({ showErrorMessage: false });
    }, 3000); 
  };

  render() {
    const { showToast, showSuccessMessage, showErrorMessage } = this.state;

    return (
      <div className='bg-[#f3f3f3]' style={{ height: '35rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className='p-8 h-[28rem] w-[80%] bg-white'>
          <h1 className='font-bold text-5xl'>Toast</h1>
          <h1 className='text-[1.1rem] mt-3'>Notification message or a piece of information displayed above the page content.</h1>
          <button className='bg-red-600 text-black rounded w-[7rem] h-7' onClick={this.handleOpenClick}>
            {showToast ? 'Close' : 'Open'}
          </button>

          {showToast && (
            <div className='h-[10rem] w-[40%] bg-blue-500 rounded mt-10 text-white p-3'>
              <h1>Toast Life <br /> Long details go here after the title, long details go here<br /> after the title.</h1>
              <div className='flex gap-2'>
                <button className='bg-white text-black rounded w-[7rem] h-7' onClick={this.handleConfirmClick}>Confirm</button>
                <button className='bg-white text-black rounded w-[7rem] h-7' onClick={this.handleCancelClick}>Cancel</button>
              </div>
            </div>
          )}

          {showSuccessMessage && (
            <div className='w-[7rem] h-11 mt-3 p-3 bg-green-500 text-white rounded'>
              Success message
            </div>
          )}

          {showErrorMessage && (
            <div className='w-[8rem] h-11 mt-3 p-3 bg-red-500 text-white rounded'>
              Error message
            </div>
          )}
        </div>
      </div>
    );
  }
}
