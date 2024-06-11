// import React, { Component, ChangeEvent, FormEvent } from 'react';

// interface SumState {
//   number1: string;
//   number2: string;
//   sum: number | null;
// }

// class Sum extends Component<{}, SumState> {
//   constructor(props: {}) {
//     super(props);
//     this.state = {
//       number1: '',
//       number2: '',
//       sum: null,
//     };

//     // Binding the event handlers
//     this.handleChange = this.handleChange.bind(this);
//     this.calculateSum = this.calculateSum.bind(this);
//   }

//   handleChange(event: ChangeEvent<HTMLInputElement>) {
//     const { name, value } = event.target;
//     this.setState({
//       [name]: value,
//     } as Pick<SumState, keyof SumState>);
//   }

//   calculateSum(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const { number1, number2 } = this.state;
//     const sum = parseFloat(number1) + parseFloat(number2);
//     this.setState({ sum });
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.calculateSum}>
//           <input
//             type="number"
//             name="number1"
//             value={this.state.number1}
//             onChange={this.handleChange}
//             placeholder="Enter first number"
//           />
//           <input
//             type="number"
//             name="number2"
//             value={this.state.number2}
//             onChange={this.handleChange}
//             placeholder="Enter second number"
//           />
//           <button type="submit">Calculate Sum</button>
//         </form>
//         {this.state.sum !== null && <h2>The sum is: {this.state.sum}</h2>}
//       </div>
//     );
//   }
// }

// export default Sum;

import React, { Component } from 'react'

export default class Sum extends Component {
  render() {
    return (
      <div>Sum</div>
    )
  }
}

