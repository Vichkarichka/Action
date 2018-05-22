import React from 'react';
import Picker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import './Demo.css';

import moment from 'moment';
import 'moment/locale/en-gb';

import { Input } from 'semantic-ui-react';

moment.locale('en-gb');
const now = moment();
now.utcOffset(0);
const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

const timePickerElement = (
    <TimePickerPanel
        defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
    />
);

function newArray(start, end) {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
}

function disabledDate(current) {
    if (!current) {
        return false;
    }
    const date = moment();
    date.hour(0);
    date.minute(0);
    date.second(0);
    return current.valueOf() < date.valueOf();
}

function disabledTime(time, type) {
    console.log('disabledTime', time, type);
    if (type === 'start') {
        return {
            disabledHours() {
                const hours = newArray(0, 60);
                hours.splice(0, 60);
                return hours;
            },
            disabledMinutes(h) {
                return [];
            },
        };
    }
    return {
        disabledHours() {
            const hours = newArray(0, 60);
            hours.splice(0, 60);
            return hours;
        },
        disabledMinutes(h) {
            return [];
        },
    };
}

const formatStr = 'DD-MM-YYYY HH:mm:ss';
function format(v) {
    return v ? v.format(formatStr) : '';
}

function isValidRange(v) {
    return v && v[0] && v[1];
}


export default class Demo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            values: [],
            hoverValue: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps && nextProps.value) {
            this.setState({values: nextProps.value});
        }
    }

    onChange = (values) => {
        this.setState({
            values: values,
        });
    };

    onHoverChange = (hoverValue) => {
        this.setState({ hoverValue });
    };

    handleSubmit() {
        let startData = this.state.values[0];
        let endData = this.state.values[1];
        this.props.onSetData({ startData: startData, endData: endData })
    }

    render() {
        const state = this.state;
        const calendar = (
            <RangeCalendar
                hoverValue={state.hoverValue}
                onHoverChange={this.onHoverChange}
                showWeekNumber={false}
                dateInputPlaceholder={['start', 'end']}
                defaultValue={[now, now.clone().add(1, 'months')]}
                locale={enUS}
                disabledTime={disabledTime}
                disabledDate={disabledDate}
                timePicker={timePickerElement}
                onOk={this.handleSubmit}
            />
        );
        return (
            <Picker
                value={state.values}
                onChange={this.onChange}
                animation="slide-up"
                calendar={calendar}
            >
                {
                    ({ value }) => {
                        return (<span>
                <Input
                    placeholder="please select start and end time"
                    style={{ width: 410 }}
                    disabled={state.disabled}
                    readOnly
                    className="ant-calendar-picker-input ant-input"
                    value={isValidRange(value) && `${format(value[0])} - ${format(value[1])}` || ''}
                />
                </span>);
                    }
                }
            </Picker>);
    }
}