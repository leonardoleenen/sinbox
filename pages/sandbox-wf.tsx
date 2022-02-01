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
                        .execute('pep', {
                            EsVerdadero: true
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
