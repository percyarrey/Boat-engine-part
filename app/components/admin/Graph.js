'use client'

import React from 'react'

export default function Graph() {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [12, 19, 3, 5, 2, 3, 9],
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
          },
        ],
      };
      
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };
  return (
    <div>
      {/* <Line data={data} options={options} /> */}
    </div>
  )
}
