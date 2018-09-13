import autobind from 'autobind-decorator';
import * as React from 'react';
import { OuterPropsBehaviour, OuterPropsTheme, State } from './TestType';

/** Убран recompose для более простого вкатывания */

class Behaviour extends React.Component<
    OuterPropsBehaviour & { children: React.StatelessComponent<OuterPropsTheme> },
    State
> {
    public render() {
        return this.props.children({ ...this.props, ...this.state, onClick: this.onClick });
    }

    @autobind
    protected onClick() {
        console.log('Click');
    }
}

/** Это неизменный бойлерплейт для превращения в HOC */

const TestBehaviour = (Component: React.ComponentClass<OuterPropsTheme>): React.ComponentType<OuterPropsBehaviour> => (
    props: OuterPropsBehaviour,
) => <Behaviour {...props}>{behaviourProps => <Component {...behaviourProps} />}</Behaviour>;

export { TestBehaviour };
