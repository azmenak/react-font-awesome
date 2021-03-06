/**
 * Created by laiff on 03.09.14.
 */
'use strict';

var React = require('react');
var assign = require('object-assign');
var cx = require('classnames');

function createIcon(type) {
    var iconType = type;
    return React.createClass({
        propTypes: {
          type: React.PropTypes.string.isRequired,
          inverse: React.PropTypes.bool,
          spin: React.PropTypes.bool,
          fixedWidth: React.PropTypes.bool,
          li: React.PropTypes.bool,
          border: React.PropTypes.bool,
          size: React.PropTypes.oneOf([ 'lg', '1x', '2x', '3x', '4x', '5x' ]),
          rotate: React.PropTypes.oneOf([ 90, 180, 270 ]),
          flip: React.PropTypes.oneOf([ 'horizontal', 'vertical' ]),
          stack: React.PropTypes.oneOf([ '1x', '2x' ]),
          align: React.PropTypes.oneOf([ 'left', 'center', 'right', 'justify' ]),
          pull: React.PropTypes.oneOf([ 'left', 'right' ]),
          text: React.PropTypes.oneOf([ 'muted', 'primary', 'success', 'info', 'warning', 'danger' ])
        },
        render: function () {
            var type = iconType || this.props.type;
            var classes = {
                'fa': true,
                'fa-spin': this.props.spin,
                'fa-fw': this.props.fixedWidth,
                'fa-li': this.props.li,
                'fa-border': this.props.border,
                'fa-inverse': this.props.inverse
            };
            classes['fa-' + type] = type;
            classes['fa-' + this.props.size] = this.props.size;
            classes['fa-rotate-' + this.props.rotate] = this.props.rotate;
            classes['fa-flip-' + this.props.flip] = this.props.flip;
            classes['fa-stack-' + this.props.stack] = this.props.stack;
            classes['fa-align-' + this.props.align] = this.props.align;
            classes['fa-pull-' + this.props.pull] = this.props.pull;
            classes['text-' + this.props.text] = this.props.text;

            var className = cx(classes) + ' ' + (this.props.className || '');

            return React.createElement('i',
                assign({}, this.props, { className: className }),
                this.props.children
            );
        }
    });
}

var IconStack = React.createClass({
    propTypes: {
      size: React.PropTypes.oneOf([ 'lg', '1x', '2x', '3x', '4x', '5x' ])
    },
    render: function () {
        var classes = { 'fa-stack': true };
        classes['fa-' + this.props.size] = this.props.size;

        var className = cx(classes) + ' ' + (this.props.className || '');

        return React.createElement('span',
            assign({}, this.props, { className: className }),
            this.props.children
        );
    }
});

var Ul = React.createClass({
    render: function () {
        var classes = { 'fa-ul': true };
        var className = cx(classes) + ' ' + (this.props.className || '');

        return React.createElement('ul',
            assign({}, this.props, { className: className }),
            this.props.children
        );
    }
});

var Icon = createIcon();

var Animate = React.createClass({
    propTypes: {
      interval: React.PropTypes.number
    },
    getInitialState: function () {
        return {
            childCount: 0,
            child: React.createElement('span')
        };
    },
    componentWillMount: function () {
        if (this.props.children) {
            this.timer = setInterval(function () {
                var newChild = this.state.childCount + 1;
                if (this.props.children.length <= newChild) {
                    newChild = 0;
                }
                this.setState({
                    childCount: newChild,
                    child: this.props.children[newChild]
                });
            }.bind(this), this.props.interval || 1000);

            this.setState({
                child: this.props.children[0]
            });
        }
    },
    componentWillUnmount: function () {
        clearInterval(this.timer);
    },
    render: function () {
        return this.state.child;
    }
});

module.exports = {
    Icon: Icon,
    Ul: Ul,
    IconStack: IconStack,
    Animate: Animate
};
