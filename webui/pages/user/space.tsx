import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { ChainContext, IChainContext } from '../_app'



export default function Space() {

    const renderContext = (chainContext: IChainContext) => {
        if (chainContext.user.space !== undefined) {
            return <p>{JSON.stringify(chainContext.user.space)}</p>
        } else {
            return chainContext.spaces.map((space) => <p>{space}</p>)
        }
    }
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Space
            </Typography>
            <ChainContext.Consumer>
                {(chainContext) => renderContext(chainContext)}
            </ChainContext.Consumer>
        </Container>
    )
}