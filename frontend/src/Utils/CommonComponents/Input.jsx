import React, { Component } from "react";

// An Input component with validation.
// You can pass the following props to use the component

// onChange => Required* => (Handles the value change)
// value => Required* => (Prop where value of the input field can be obtained)
// type => Optional => (default value is "text")
// placeholder => Optional => (Serves as placeholder for the input field till any value is entered)
// width => Optional => (Specify width of the field(Default value = 100%))
// height => Optional => (Specify height of the field(Default value = 25px))

class Input extends Component {
    state = {
        value: "",
        showError: false
    };
    handleChange = event => {
        this.setState({
            value: event.target.value,
            showError: event.target.value === "" ? true : false
        });
        this.props.getValue(event.target.value);
    };
    componentDidMount() {
        if (this.props.defaultValue) {
            this.setState({ value: this.props.defaultValue }, () =>
                this.props.getValue(this.state.value)
            );
        }
    }

    static getDerivedStateFromProps = (nextProps, PrevState) => {
        if (
            nextProps.defaultValue !== PrevState.value &&
            nextProps.defaultValue !== undefined
        ) {
            return { value: nextProps.defaultValue };
        } else return null;
    };

    render() {
        return (
            <>
                {this.props.type === "textarea" ? (
                    <div className="input-and-error">
                        <div className="input-box">
                            <textarea
                                name={this.props.name}
                                style={{
                                    width: this.props.width || "100%",
                                    height: this.props.height || "100%",
                                    paddingLeft: 10
                                }}
                                onChange={event => this.handleChange(event)}
                                type={this.props.type}
                                value={this.state.value}
                                placeholder={this.props.placeholder}
                            />
                        </div>
                        {this.props.required && this.state.showError ? (
                            <label className="input-error">
                                {this.props.errorMessage || "*Please fill this required field"}
                            </label>
                        ) : (
                                ""
                            )}
                    </div>
                ) : (
                        <div className="input-and-error">
                            <div className="input-box">
                                <input
                                    style={{
                                        width: this.props.width || "100%",
                                        height: this.props.height || "100%",
                                        paddingLeft: 10
                                    }}
                                    name={this.props.name}
                                    onChange={event => this.handleChange(event)}
                                    type={this.props.type}
                                    value={this.state.value}
                                    placeholder={this.props.placeholder}
                                />
                            </div>
                            {this.props.required && this.state.showError ? (
                                <label className="input-error">
                                    {this.props.errorMessage || "*Please fill this required field"}
                                </label>
                            ) : (
                                    ""
                                )}
                        </div>
                    )}
            </>
        );
    }
}

export default Input;
