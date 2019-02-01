import { mount, shallow } from 'enzyme';
import React from 'react';

import InputTags from './';

const initMockProps = moreProps => {
    const baseProps = { tags: [{ id: 0, text: 'test' }] };
    return { ...baseProps, ...moreProps };
};

describe('InputTags', () => {
    let mockedProps;

    beforeEach(() => {
        mockedProps = initMockProps({
            onDeleteTag: jest.fn(),
            onInputChange: jest.fn(),
            onEmptyDelete: jest.fn(),
            onNewTag: jest.fn(),
            keyCodes: [9, 13],
        });
    });

    afterEach(() => {
        mockedProps = initMockProps();
    });

    describe('UI Behavior', () => {
        it('should render one of self', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);

            expect(wrapper).toBeTruthy();
        });
        it('should call default prop functions', () => {
            const wrapper = shallow(<InputTags {...initMockProps()} />);
            wrapper.instance().props.onDeleteTag();
            wrapper.instance().props.onInputChange();
            wrapper.instance().props.onEmptyDelete();
            wrapper.instance().props.onNewTag();
            expect(wrapper).toBeTruthy();
        });
        it('should handle on delete tag', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const close = wrapper.find('.close');
            close.simulate('click');
            expect(wrapper.instance().props.onDeleteTag).toBeCalled();
        });
    });

    describe('componentDidUpdate', () => {
        it('should component did update and call clear input', () => {
            const wrapper = mount(<InputTags {...mockedProps} clearInputOnNewTag />);
            wrapper.setProps({ tags: [...wrapper.props().tags, { id: 1, text: 'test2' }] });
            expect(wrapper.instance().props.onInputChange).toBeCalled();
        });
        it('should component did update and should not call clear input', () => {
            const wrapper = mount(<InputTags {...mockedProps} />);
            wrapper.setProps({ tags: [...wrapper.props().tags, { id: 1, text: 'test2' }] });
            expect(wrapper.instance().props.onInputChange).not.toBeCalled();
        });
    });

    describe('handleChange', () => {
        it('should parse paste if did paste is true', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const e = { target: { value: 'test' } };
            wrapper.instance().parsePaste = jest.fn();
            wrapper.instance().clearInput = jest.fn();
            wrapper.setState({ didPaste: true });
            wrapper.instance().handleChange(e);
            expect(wrapper.state('didPaste')).toBeFalsy();
            expect(wrapper.instance().parsePaste).toBeCalled();
            expect(wrapper.instance().props.onInputChange).toBeCalled();
            expect(wrapper.instance().clearInput).toBeCalled();
        });
        it('should handle the input change', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const event = { target: { value: 'test' } };
            wrapper.instance().handleChange(event);
            expect(wrapper.instance().props.onInputChange).toBeCalled();
        });
    });

    describe('handleKeyDown', () => {
        it('should execute on new tag callback when keyCode is 9', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const e = { keyCode: 9, preventDefault: () => {}, target: { value: 'test' } };
            wrapper.instance().handleKeyDown(e);
            expect(mockedProps.onNewTag).toBeCalled();
        });
        it('should execute on new tag callback when keyCode is 13', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const e = { keyCode: 13, preventDefault: () => {}, target: { value: 'test' } };
            wrapper.instance().handleKeyDown(e);
            expect(mockedProps.onNewTag).toBeCalled();
        });
        it('should handle key down enter', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const event = { keyCode: 13, target: { value: 'test' } };
            wrapper.instance().handleKeyDown(event);
            expect(wrapper.instance().props.onNewTag).toBeCalled();
        });
        it('should handle key down backspace/delete', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const event = { keyCode: 8, target: { value: '' } };
            wrapper.instance().handleKeyDown(event);
            expect(wrapper.instance().props.onEmptyDelete).toBeCalled();
        });
        it('should handle key down not enter', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const event = { target: { value: 'test' } };
            wrapper.instance().handleKeyDown(event);
            expect(wrapper.instance().props.onNewTag).not.toBeCalled();
        });
    });

    describe('handleKeyUp', () => {
        it('should clear input if clear on new is true', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const e = { keyCode: 9, preventDefault: () => {}, target: { value: 'test' } };
            wrapper.setProps({ clearInputOnNewTag: true });
            wrapper.instance().clearInput = jest.fn();
            wrapper.instance().handleKeyUp(e);
            expect(wrapper.instance().clearInput).toBeCalled();
        });
        it('should not clear input', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const e = { keyCode: 22, preventDefault: () => {}, target: { value: 'test' } };
            wrapper.setProps({ clearInputOnNewTag: true });
            wrapper.instance().clearInput = jest.fn();
            wrapper.instance().handleKeyUp(e);
            expect(wrapper.instance().clearInput).not.toBeCalled();
        });
    });

    describe('handlePaste', () => {
        it('should set state', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            wrapper.instance().handlePaste();
            expect(wrapper.state('didPaste')).toBeTruthy();
        });
    });

    describe('parsePaste', () => {
        it('should parse the input and call on new tag when appropriate', () => {
            const wrapper = shallow(<InputTags {...mockedProps} />);
            const value = 'this\tis\na list,test';
            wrapper.instance().parsePaste(value);
            expect(mockedProps.onNewTag).toBeCalled();
        });
    });
});