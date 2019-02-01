import React, { Component } from 'react';
import InputTags from '@derekedelaney/react-input-tags';

const debug = () => () => {};
let idTracker = 2;

export default class Simple extends Component {
    state = {
        tags: [{ id: 0, text: 'Last, First 1' }, { id: 1, text: 'Last, First 2' }],
    };

    componentDidMount() {
        debug('default tags')(JSON.stringify(this.state.tags));
    }

    componentDidUpdate() {
        debug('tags')(JSON.stringify(this.state.tags));
    }

    handleDeleteTag = (tag, index) => {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((t, i) => index !== i),
        });
        debug('handleDeleteTag')(JSON.stringify(tag));
    };

    handleEmptyDelete = () => {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((t, i) => i !== tags.length - 1),
        });
        debug('handleEmptyDelete')();
    };

    handleNewTag = value => {
        if (value) this.setState(({ tags }) => ({ tags: tags.concat({ id: idTracker++, text: value }) })); //eslint-disable-line
        debug('handleInputEnter')(JSON.stringify({ id: idTracker++, text: value })); //eslint-disable-line
    };

    handleInputChange = value => {
        debug('handleInputChange')(value);
    };

    render() {
        return (
            <div>
                <InputTags
                    tags={this.state.tags}
                    keyCodes={[9, 13, 32, 188]}
                    onDeleteTag={this.handleDeleteTag}
                    onNewTag={this.handleNewTag}
                    onInputChange={this.handleInputChange}
                    onEmptyDelete={this.handleEmptyDelete}
                    clearInputOnNewTag
                    inputPlaceholderText="Type anything here"
                />
            </div>
        );
    }
}