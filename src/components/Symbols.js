import React, { Component } from 'react';

import Symbol from './Symbol';

export class Symbols extends Component {
    render() {
        return (
            <div className="Symbols">
                <Symbol type="Process" title="Hallo Welt!"/>
            </div>
        );
    }
}

export default Symbols;
