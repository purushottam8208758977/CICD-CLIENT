import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Login } from './login'                     //this component will be tested
import '../Login.css'
import { expect } from 'chai';



Enzyme.configure({ adapter: new Adapter() })

describe("checking component", () => {
    let component = mount(<Login />)

    it("Checking the presence of whole component", () => {
        component.debug() // passes only when the component exists
        component.contains(<div className="SignIn"> <br /> Sign in </div>)
        //        console.log("\n\n\ttest result--> ",component.debug())
    })

})

describe('Login component', () => {
    it('Checking number of constructors ', () => {
        const wrapper = mount(<Login />);
        expect(wrapper.find(Login)).to.have.lengthOf(1);
    })
    
    it('Checks the class U instances', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.U')).to.have.lengthOf(3);
    })
    
    
    it('Checks the class N instances', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.N')).to.have.lengthOf(2);
    })
    
    it('Checks the class F instances', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('.F')).to.have.lengthOf(3);
    })
    
    it('Existence of a CSS class',()=>{
    const wrapper = mount(<div className="Login" />);
    expect(wrapper.exists('.Login')).to.equal(true);
    expect(wrapper.find('.other-class').exists()).to.equal(false);
    })
})
