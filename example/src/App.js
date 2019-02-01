import React, { Component } from 'react';

import Simple from './examples/simple';
import Custom from './examples/custom';

export default class App extends Component {
    render() {
        return (
            <div>
                This is a basic example
                <Simple />
                This is a custom example
                <Custom />
            </div>
        );
    }
}
