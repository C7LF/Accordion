import React from 'react'
import renderer from 'react-test-renderer';

import { shallow, mount } from 'enzyme';

import Accordion from './accordion'

describe('Accordion component', () => {

    const mockData = {
        number: '1',
        question: 'question text',
        answer: 'answer text'
    }

    test('Snapshot for accordion component', () => {
        const accordion = renderer.create(<Accordion {...mockData} />)
        let conv = accordion.toJSON()
        expect(conv).toMatchSnapshot()
    })

    test('Should render component at least once', () => {
        const wrapper = shallow(<Accordion {...mockData} />)
        expect(wrapper.find('.accordion__item').length).toBe(1);
    })

    test('Should not render accordion__item if no props are passed', () => {
        const wrapper = shallow(<Accordion />)
        expect(wrapper.find('.accordion__item').length).toBe(0);
    })

    test('Should not render component if order props are only partly passed', () => {
        const wrapper = shallow(<Accordion {...mockData} number='' />)
        expect(wrapper.find('.accordion__item').length).toBe(0);
    })

    test('Should render question div', () => {
        const wrapper = shallow(<Accordion {...mockData} />)
        expect(wrapper.find('.accordion__question').length).toBe(1);
    })

    test('Should render answer div', () => {
        const wrapper = shallow(<Accordion {...mockData} />)
        expect(wrapper.find('.accordion__answer').length).toBe(1);
    })

    test('active class should be present when click is simulated', () => {
        const wrapper = mount(<Accordion {...mockData} />)
        const question = wrapper.find('.accordion__question')
        console.log(wrapper)
        expect(question.length).toBe(1)
        question.simulate('click')
        expect(wrapper.find('.accordion__question').hasClass('active')).toBe(true)
    })
})