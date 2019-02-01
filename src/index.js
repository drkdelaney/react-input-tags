import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Close from './close-button';

import './styles.css';

export default class InputTags extends Component {
    static propTypes = {
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
                text: PropTypes.string.isRequired
            })
        ).isRequired,
        onDeleteTag: PropTypes.func,
        onNewTag: PropTypes.func,
        keyCodes: PropTypes.arrayOf(PropTypes.number),
        onInputChange: PropTypes.func,
        onEmptyDelete: PropTypes.func,
        clearInputOnNewTag: PropTypes.bool,
        inputPlaceholderText: PropTypes.string,
        borderClass: PropTypes.string,
        tagContainerClass: PropTypes.string,
        tagClass: PropTypes.string,
        closeClass: PropTypes.string,
        tagInputClass: PropTypes.string
    };

    static defaultProps = {
        onDeleteTag: () => {},
        keyCodes: [],
        onInputChange: () => {},
        onEmptyDelete: () => {},
        onNewTag: () => {},
        clearInputOnNewTag: false,
        borderClass: null,
        tagContainerClass: null,
        tagClass: null,
        closeClass: null,
        tagInputClass: null
    };

    state = {
        didPaste: false
    };

    componentDidUpdate(prevProps) {
        if (
            prevProps.tags.length < this.props.tags.length &&
            this.props.clearInputOnNewTag
        ) {
            this.clearInput();
            this.props.onInputChange('');
        }
    }

    keyCodeMap = {
        '\t': 9,
        '\n': 13,
        ' ': 32,
        ',': 188
    };

    handleChange = e => {
        if (this.state.didPaste) {
            this.setState({ didPaste: false });
            this.parsePaste(e.target.value);
            this.props.onInputChange(e.target.value);
            this.clearInput();
        } else {
            this.props.onInputChange(e.target.value);
        }
    };

    handleKeyDown = e => {
        if (this.props.keyCodes.indexOf(e.keyCode) > -1) {
            if (e.keyCode === 9) e.preventDefault();
            this.props.onNewTag(e.target.value.trim());
        }
        if (e.keyCode === 8 && e.target.value === '') {
            this.props.onEmptyDelete();
        }
    };

    handleKeyUp = e => {
        if (
            this.props.clearInputOnNewTag &&
            this.props.keyCodes.indexOf(e.keyCode) > -1
        ) {
            this.clearInput();
        }
    };

    handlePaste = () => {
        this.setState({ didPaste: true });
    };

    parsePaste = value => {
        for (let i = 0, j = 0; i < value.length; i++) {
            if (this.props.keyCodes.indexOf(this.keyCodeMap[value[i]]) > -1) {
                this.props.onNewTag(value.slice(j, i).trim());
                j = i + 1;
            } else if (i === value.length - 1) {
                this.props.onNewTag(value.slice(j, value.length).trim());
            }
        }
    };

    clearInput = () => {
        this.input.value = '';
    };

    render() {
        const {
            tags,
            onDeleteTag,
            inputPlaceholderText,
            borderClass,
            tagContainerClass,
            tagClass,
            closeClass,
            tagInputClass
        } = this.props;

        return (
            <div className={cx('border', borderClass)}>
                <div className={cx('tagContainer', tagContainerClass)}>
                    {tags &&
                        tags.map((tag, index) => (
                            <span
                                key={tag.id}
                                className={cx('tag', tagClass)}
                            >
                                {tag.text}
                                <Close
                                    size={12}
                                    className={cx('close', closeClass)}
                                    onClick={() => {
                                        onDeleteTag(tag, index);
                                    }}
                                />
                            </span>
                        ))}
                    <input
                        ref={node => (this.input = node)}
                        className={cx('tagInput', tagInputClass)}
                        type="search"
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        onKeyUp={this.handleKeyUp}
                        placeholder={inputPlaceholderText}
                        onPaste={this.handlePaste}
                    />
                </div>
            </div>
        );
    }
}
