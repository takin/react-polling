import React,{Component} from 'react';
import firebase from 'firebase';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class PollingApp extends Component {
    constructor(props){
        super(props);
        this.dataSource = this.props.dataSource.database().ref(this.props.polling.toLowerCase());
        this.storage = window.localStorage;

        this.previousPercents = [];
        this.state = {
            candidates:[],
            percents:[],
            totalvote:0
        }
    }

    updateData(newData) {
        let data = newData.val();
        var _candidates = data.kandidat.map(item => {
            item.percent = (data.totalvote === 0) ? 0 : ((item.jumlah / data.totalvote) * 100).toFixed(2);
            return item;
        });
        
        this.setState({
            candidates: _candidates,
            totalvote: data.totalvote
        });
    }

    componentDidMount() {
        this.dataSource.on('value', this.updateData.bind(this));
    }
    
    vote(id) {
        var isVoted = window.localStorage.getItem('newvote');
        if ( isVoted === null) {
            this.dataSource.child('kandidat/' + id +'/jumlah').set(this.state.candidates[id].jumlah + 1);
            this.dataSource.child('totalvote').set(this.state.totalvote + 1);
            window.localStorage.setItem('newvote', true);
        }
    }

    render() {
        if( this.state.candidates.length === 0 ) 
            return <div className='loading'>Loading data hasil polling calon {this.props.polling}...</div>;

        let barColumnStyle = {
            verticalAlign:'bottom',
            height:150,
            color: 'rgb(100,10,111)'
        }

        let kandidat = this.state.candidates.map((item, id) => {
            return(
                <td key={id}>
                    <table cellPadding='0' cellSpacing='0'>
                        <tbody>
                            <tr>
                                <td style={barColumnStyle}>
                                    {item.percent}%
                                    <div className='bar-chart' style={{height:this.state.candidates[id].percent + '%'}}></div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id='item-img'>
                                        <img src={item.foto} />
                                        <div className='candidate-name'>{item.nama}</div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href='javascript:///' className='vote-btn' onClick={this.vote.bind(this, id)}>Vote</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            );
        });

        return(
            <div id='inner-container'>
                <div id='header'>
                    Polling calon {this.props.polling}
                </div>
                <table>
                    <tbody>
                        <tr>
                            <ReactCSSTransitionGroup transitionName='fade' transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                                {kandidat}
                            </ReactCSSTransitionGroup>
                        </tr>
                    </tbody>
                </table>
                <div id='total-voters'>Total Voters: {this.state.totalvote}</div>
            </div>
        );
    }
}