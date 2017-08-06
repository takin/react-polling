import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import PilihTingkat from './components/pilih-tingkat.jsx';
import PollingApp from './components/polling-app.jsx';

import './public/style.css';

let fconf = {
    apiKey: 'AIzaSyAaFxvxCHl15jR9wWE55myqhvLufPSd7dI',
    databaseURL: 'https://polling-c6656.firebaseio.com/'
}

firebase.initializeApp(fconf);

export default class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            tingkat:null
        }
    }

    setTingkat(_tingkat){
        this.setState({
            tingkat:_tingkat
        });
    }

    render() {
        if(this.state.tingkat){
            return (
                <div id='wrapper' style={{height:this.state.browserHeight+'px'}}>
                    <PollingApp dataSource={firebase} polling={this.state.tingkat} />
                </div>
            )
        }
        return <PilihTingkat data={this.props.tingkatOptions} tingkat={this.setTingkat.bind(this)} />
    }

}

ReactDOM.render(<App tingkatOptions={['Bupati','Gubernur']} />, document.getElementById('polling'));