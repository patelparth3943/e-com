/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

function Rating({ rate, count }) {
    return (
        <div >
            <h4 className="sr-only">Reviews</h4>
            <div className="flex items-center">
                <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <Star
                            key={rating}
                            className={cn('h-5 w-5 flex-shrink-0', rate > rating ? 'fill-gray-900' : 'fill-gray-200',

                            )}
                            aria-hidden="true"
                        />
                    ))}
                </div>
                <p className="sr-only">{rate} out of 5 stars</p>
                <a
                    href="#"
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                    {count} reviews
                </a>
            </div>
        </div>
    )
}
Rating.propsTypes = {
    rate: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
};
export default Rating