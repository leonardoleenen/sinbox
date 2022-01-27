import React, { useState } from 'react'
import type { NextPage } from 'next'
import { ruleEngine } from '../services/rule.engine.service'

const Page: NextPage = () => {
    return (
        <div>
            <button
                className="btn btn-primary"
                onClick={e => {
                    ruleEngine
                        .execute('gD13J4431VScjhSEWHvS', {
                            role: 'ESCRIBANO',
                            signal: 'INIT'
                        })
                        .then(result => console.log(result))
                }}
            >
                Execute
            </button>
        </div>
    )
}

export default Page
