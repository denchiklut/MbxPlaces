import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import mbxClient from '@mapbox/mapbox-sdk'
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding';

import './index.css';

export default class MbxPlaces extends Component {
    static propTypes = {
        /** API_KEY for mapBox map API */
        apiKey: PropTypes.string.isRequired,

        /** Class for input */
        inputClassname: PropTypes.string,

        /** Class for wrapper container */
        wrapperClassname: PropTypes.string,

        /** Class for wrapper suggestions list */
        suggestedWrapperClassname: PropTypes.string,

        /** Class for suggested item */
        suggestedItemClassname: PropTypes.string,

        /** Call back function */
        onSelect: PropTypes.func.isRequired,

        /** Limit of suggestions */
        limit: PropTypes.number,

        /** Bbox */
        bbox: PropTypes.array
    };

    static defaultProps = {
        inputClassname: null,
        wrapperClassname: null,
        suggestedWrapperClassname: null,
        suggestedItemClassname: null,
        bbox: null,
        limit: 5
    };

    state = {
        term: '',
        resultList: [],
        isShowList: false
    };

    wrapper = React.createRef();

    componentDidMount() {
        this.body = document.querySelector('body');
        this.body.addEventListener('click', this.onClickAway);
    }

    componentWillUnmount() {
        this.body.removeEventListener('click', this.onClickAway);
    }

    onClickAway = ({ target }) => {
        if (!this.wrapper.current.contains(target)) {
            this.setState({ isShowList: false });
        }
    };

    fetchAddress = term => {
        const { apiKey, limit, bbox } = this.props;
        const baseClient = mbxClient({ accessToken: apiKey });

        if (term) {
            mbxGeocoding(baseClient)
                .forwardGeocode({
                    query: term,
                    autocomplete: true,
                    bbox: bbox,
                    limit
                })
                .send()
                .then(response => {
                    this.setState({
                        isShowList: true,
                        resultList: response.body.features
                    })
                });
        }
    };

    onChange = ({ target: { value }}) => {
        this.setState({ term: value });
        this.fetchAddress(value)
    };

    onFocus = () => this.setState({ isShowList: true });

    onSelect = address => () => {
        const { onSelect } = this.props;
        this.setState({ term: address.place_name, isShowList: false });
        onSelect(address)
    };

    renderResultList = () => {
        const { resultList } = this.state;
        const { suggestedItemClassname } = this.props;

        return resultList.map(item => (
            <button
                key={ item.id }
                className={ cn('resultItem', suggestedItemClassname) }
                onClick={ this.onSelect(item) }
            >
                { item.place_name }
            </button>
        ));
    };

    render() {
        const { term, isShowList, resultList } = this.state;
        const {
            inputClassname,
            wrapperClassname,
            suggestedWrapperClassname
        } = this.props;

        return (
            <div ref={ this.wrapper } className={ cn('wrapper', wrapperClassname) }>
                <label>
                    <input
                        type="text"
                        value={ term }
                        placeholder="Search.."
                        className={ cn('inputSearch', inputClassname)}
                        onChange={ this.onChange }
                        onFocus={ this.onFocus }
                    />
                </label>

                { isShowList && resultList.length > 0 && (
                    <div className={ cn('resultList', suggestedWrapperClassname) }>
                        { this.renderResultList() }
                    </div>
                )}
            </div>
        );
    }
}
