import React, { useEffect, useState } from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'

const Shop = () => {
  const [popular, setPopular] = useState<any[]>([]);
  const [newcollection, setNewCollection] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async () => { 
    try {
      const popularRes = await fetch('http://localhost:400
