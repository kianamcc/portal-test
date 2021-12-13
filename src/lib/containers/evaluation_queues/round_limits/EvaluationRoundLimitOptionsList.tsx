import React, { useCallback, useEffect } from 'react'
import {
  EvaluationRoundLimitOptions,
  LIMIT_TYPE_DISPLAY_NAME,
} from './EvaluationRoundLimitOptions'
import { EvaluationRoundLimitType } from '../../../utils/synapseTypes/Evaluation'
import IconPlusSquareFilled from '../../../assets/icons/icon_plus_square_filled.svg'
import IconTimes from '../../../assets/icons/icon_times.svg'
import { EvaluationRoundLimitInput } from '../input_models/models'
import { Button } from 'react-bootstrap'

const AVAILABLE_LIMIT_TYPES = Object.keys(LIMIT_TYPE_DISPLAY_NAME)

export type EvaluationRoundLimitOptionsListProps = {
  limitInputs: EvaluationRoundLimitInput[]
  handleChange: (
    index: number,
  ) => (limitInput: EvaluationRoundLimitInput) => void

  handleDeleteLimit: (index: number) => () => void

  onAddNewLimit: (limit: EvaluationRoundLimitInput) => void
}

const selectUnusedType = (
  selectedTypes: Set<EvaluationRoundLimitType>,
): EvaluationRoundLimitType => {
  return AVAILABLE_LIMIT_TYPES.find(
    key => !selectedTypes.has(key as EvaluationRoundLimitType),
  ) as EvaluationRoundLimitType
}

export const EvaluationRoundLimitOptionsList: React.FunctionComponent<EvaluationRoundLimitOptionsListProps> = ({
  limitInputs,
  handleChange,
  handleDeleteLimit,
  onAddNewLimit,
}) => {
  // all types that are currently being used
  const selectedTypes: Set<EvaluationRoundLimitType> = new Set(
    limitInputs.map(limit => limit.type),
  )

  const addNewLimit = useCallback(() => {
    onAddNewLimit({
      type: selectUnusedType(selectedTypes),
      maxSubmissionString: '',
    })
  }, [onAddNewLimit, selectedTypes])

  //display some input even if no limits currently exist
  useEffect(() => {
    if (limitInputs.length === 0) {
      addNewLimit()
    }
  }, [limitInputs, addNewLimit])

  return (
    <div className="advanced-limits-grid">
      {limitInputs.map((limit, index) => {
        return (
          <React.Fragment key={limit.type}>
            <EvaluationRoundLimitOptions
              limitInput={limit}
              allSelectedTypes={selectedTypes}
              onChange={handleChange(index)}
            />

            {/*remove button for the EvaluationRoundLimitOptions*/}
            <Button
              // use an invalid variant, we just want the basic bootstrap 4 "btn" class behavior
              variant=""
              className="remove-button"
              onClick={handleDeleteLimit(index)}
            >
              <img src={IconTimes} className="SRC-icon-fill" />
            </Button>

            {/*conditionally create a "add" button*/}
            {
              // if last element
              index === limitInputs.length - 1 &&
                // if the are unused limit types
                limitInputs.length < AVAILABLE_LIMIT_TYPES.length && (
                  <Button
                    // use an invalid variant, we just want the basic bootstrap 4 "btn" class behavior
                    variant=""
                    onClick={addNewLimit}
                    className="add-button"
                  >
                    <img src={IconPlusSquareFilled} className="SRC-icon-fill" />
                  </Button>
                )
            }
          </React.Fragment>
        )
      })}
    </div>
  )
}
