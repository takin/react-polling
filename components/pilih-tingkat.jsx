import React,{Component} from 'react';

export default class PilihTingkat extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        var btn = this.props.data.map((item, id) => {
            return(
                <button key={id} onClick={this.props.tingkat.bind(this, item)}>
                    {item}
                </button>
            );
        });
        return <div className='pilih-btn'>{btn}</div>
    }
}