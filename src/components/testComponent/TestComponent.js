import React from 'react';

const TestComponent = (props) => {
    
    return (
        <div>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child, {className: 'test', char: props.char}, [`Some Block ${props.char}`])
                })
            }
        </div>
    )
}

export default TestComponent;