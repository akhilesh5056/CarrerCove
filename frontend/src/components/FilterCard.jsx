import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'
import { motion } from 'framer-motion'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Chennai", "Hyderabad", "Noida"]
  },
  {
    filterType: "Inustry",
    array: ["Frontend Developer ", "Backend Developer", "Full Stack Developer", "AI Prompt Engineer"]
  },
  {
    filterType: "Salary",
    array: ["30-40k ", "40-60k", "1-1.5lakh",]
  }
]

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('')
  const dispatch = useDispatch()
  const changeHandler = (value) => {
    setSelectedValue(value)
  }
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  }, [selectedValue])
  return (
    <div className='w-full bg-white p-3 rounded'>
      <h1 className='font-bold '>Filter Jobs</h1>
      <hr className='mt-2' />
      <div>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
          {
            filterData.map((data, index) =>
              <div>
                <h1 className='font-bold'>{data.filterType}</h1>
                {
                  data.array.map((item, idx) => {
                    const itemId = `id${index}-${idx}`
                    return (
                      <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          type: 'spring',
                          stiffness: 70,
                          damping: 15,
                        }}
                        exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }} className=' flex items-center space-x-2 my-2'>
                        <RadioGroupItem value={item} id={itemId} />
                        <Label htmlFor={itemId}>{item}</Label>
                      </motion.div>
                    )

                  })
                }
              </div>

            )
          }

        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard