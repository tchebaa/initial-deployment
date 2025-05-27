import {useEffect, useState, Dispatch, SetStateAction, useRef} from 'react';
import { StyleSheet, Text, View, TextInput, Image, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, FlatList, Animated, ImageBackground  } from 'react-native';
import { FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons, Feather } from '@expo/vector-icons'; 
import HomeDateTimeCostSection from './HomeDateTimeCostSection';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import RNDateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import moment from 'moment';
import {useLanguage} from '../../context/LanguageContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Link } from 'expo-router';



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;





export default function PostDateTimeDuration({ageRestriction, dateTimePrice, setDateTimePrice, site, setSite}: 
    {ageRestriction: string [], dateTimePrice: string [], setDateTimePrice: Dispatch<SetStateAction<string []>>, site: boolean, setSite: Dispatch<SetStateAction<boolean>>}) {

    const colorScheme = useColorScheme();
    const {t} = useLanguage()

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState<string | "date" | "time" | "datetime" | "countdown" | undefined>('')
    const [selectedDate, setSelectedDate] = useState<string | Date>('')
    const [selectedDateError, setSelectedDateError] = useState<boolean>(false)
    const [selectedTime, setSelectedTime] = useState<string | Date>('')
    const [selectedTimeError, setSelectedTimeError] = useState<boolean>(false)
    const [showDateModal, setShowDateModal] = useState<boolean>(false)
    const [days, setDays] = useState<number>(0)
    const [hours, setHours] = useState<number>(0)
    const [minutes, setMinutes] = useState<number>(0)
    const [durationError, setDurationError] = useState<boolean>(false)
    const [adultPrice, setAdultPrice] = useState<number>(0)
    const [adolescentPrice, setAdolescentPrice] = useState<number>(0)
    const [childPrice, setChildPrice] = useState<number>(0)
    const [ticketTitle, setTicketTitle] = useState<string>('')
    const [ticketNumber, setTicketNumber] = useState<number>(0)
    const [ticketPriceArray, setTicketPriceArray] = useState<string []>([JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])


    const [showForm, setShowForm] = useState(true)
    const [editForm, setEditForm] = useState(false)
    const [editIndex, setEditIndex] = useState<number | null>()
    
    const scrollRef = useRef(null)

    
    const handleChangeDate = (event: DateTimePickerEvent, date: Date | null | undefined) => {
        const {
          type,
          nativeEvent: {timestamp, utcOffset},
        } = event;

        if(type === "dismissed") {

            setShowDateModal(false)

        } else {

            if(mode === 'date') {

                setSelectedDate(moment(date).startOf('day').format())
                setShowDateModal(false)

            } else {

                setSelectedTime(moment(date).format())
                setShowDateModal(false)

            }

            

        }
         
     

      };



      

      const handleOpenDateTimeModal = (item: string) => {

        setMode(item)
        setShowDateModal(!showDateModal)

      }
    
      const handleAddDatePriceItem = () => {

        const dateHours = moment(selectedTime).hours()
        const dateMinutes = moment(selectedTime).minutes()

        const eventDate = moment(selectedDate).add(dateHours, 'hours').add(dateMinutes, 'minutes')

        const eventEndDate = moment(eventDate).add(days, 'days').add(hours, 'hours').add(minutes, 'minutes')

        const item = {
            eventDate: eventDate,
            eventEndDate: eventEndDate,
            eventDays: days,
            eventHours: hours,
            eventMinutes: minutes,
            ticketPriceArray: ticketPriceArray.map((item, i)=> {
                return JSON.parse(item)
            })
        }

        if(selectedDate) {

            setSelectedDateError(false)

            if(selectedTime) {

                setSelectedTimeError(false)

                if(days > 0 || hours > 0 || minutes > 0) {

                    setDurationError(false)
                    
                    setDateTimePrice([...dateTimePrice, JSON.stringify(item)])
                    setSelectedDate('')
                    setSelectedTime('')
                    setDays(0)
                    setHours(0)
                    setMinutes(0)
                    setTicketPriceArray([JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])
                    setShowForm(false)

                } else {

                    setDurationError(true)
                }

            } else {

                setSelectedTimeError(true)
            }


        } else {
            setSelectedDateError(true)
        }

        //setDateTimePrice([..dateTimePrice, item])
      }


      const handleChangeTicketArrayInput = (item: string, value: string | number, index: number) => {

        let parsedItem = JSON.parse(ticketPriceArray[index])

        if(item === 'ticketTitle') {

            parsedItem.ticketTitle = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

            
            
        }

        if(item === 'ticketNumber') {

            parsedItem.ticketNumber = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

            
        }

        if(item === 'adultPrice') {

            parsedItem.adultPrice = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

       

        }

        if(item === 'adolescentPrice') {

            parsedItem.adolescentPrice = value

            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

           
        }

        if(item === 'childPrice') {

            parsedItem.childPrice = value


            const editedStringify = JSON.stringify(parsedItem)

            ticketPriceArray.splice(index, 1, editedStringify)
            
            setTicketPriceArray([...ticketPriceArray])

            

        }

      }


      const handleAddTicketOption = () => {
        if(ticketPriceArray.indexOf(JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})) < 0 ) {
            setTicketPriceArray([...ticketPriceArray, JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])
        }
      }

      const handleRemoveTicketOption = (index: number) => {

        ticketPriceArray.splice(index, 1)
        setTicketPriceArray([...ticketPriceArray])

      }

      const handleAddDateTimeComponent = () => {

        if(scrollRef.current) {
            setShowForm(true)
            scrollRef.current.scrollTo({y: 0})
        }

      }
      
      const handleOpenEditForm = (item: {eventDate: Date, eventDays: number, eventHours: number, eventMinutes: number, ticketPriceArray: 
        {adultPrice: number, adolescentPrice: number, childPrice: number, ticketTitle: string, ticketNumber: number} []}, index : number) => {

        if(scrollRef.current) {


            const stringifiedTicketPriceArray = item.ticketPriceArray.map((ticketOption, i)=> {
                return JSON.stringify(ticketOption)
            })

            setEditIndex(index)

            setTicketPriceArray(stringifiedTicketPriceArray)
            setSelectedDate(moment(item.eventDate).startOf('day').format())
            setSelectedTime(moment(item.eventDate).format())
            setDays(item.eventDays),
            setHours(item.eventHours)
            setMinutes(item.eventMinutes)
            setShowForm(true)
            setEditForm(true)
            scrollRef.current.scrollTo({y: 0})
        }
        
        

      }

      const handleSaveEdit = () => {

        const dateHours = moment(selectedTime).hours()
        const dateMinutes = moment(selectedTime).minutes()

        const eventDate = moment(selectedDate).add(dateHours, 'hours').add(dateMinutes, 'minutes')

        const eventEndDate = moment(eventDate).add(days, 'days').add(hours, 'hours').add(minutes, 'minutes')

        const item = {
            eventDate: eventDate,
            eventEndDate: eventEndDate,
            eventDays: days,
            eventHours: hours,
            eventMinutes: minutes,
            ticketPriceArray: ticketPriceArray.map((item, i)=> {
                return JSON.parse(item)
            })
        }

        if(selectedDate) {

            setSelectedDateError(false)

            if(selectedTime) {

                setSelectedTimeError(false)

                if(days > 0 || hours > 0 || minutes > 0) {

                    setDurationError(false)
                    
                    dateTimePrice.splice(editIndex, 1, JSON.stringify(item))

                    setDateTimePrice([...dateTimePrice])
                    
                    setSelectedDate('')
                    setSelectedTime('')
                    setDays(0)
                    setHours(0)
                    setMinutes(0)
                    setTicketPriceArray([JSON.stringify({adultPrice: 0, adolescentPrice: 0, childPrice: 0, ticketTitle: '', ticketNumber:0})])
                    setShowForm(false)

                } else {

                    setDurationError(true)
                }

            } else {

                setSelectedTimeError(true)
            }


        } else {
            setSelectedDateError(true)
        }


      }


    return (
        <ThemedView>

            <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                <ThemedView style={styles.body}>

                {showForm || dateTimePrice.length < 1 ? 

                <ThemedView style={[colorScheme === 'dark' ? {borderColor: 'white'} : {borderColor: 'gray'}, styles.container]}>
                    <ThemedView style={styles.closeFormSection}>
                        <View></View>
                        {dateTimePrice.length > 0 ? <TouchableOpacity onPress={()=> setShowForm(false)}><AntDesign name='close' size={24} color={'black'} /></TouchableOpacity>: <View></View>}
                    </ThemedView>
                    <ThemedView style={styles.dateTimeSection}>
                        <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.selectDateTimeButton]} onPress={()=> handleOpenDateTimeModal('date')}>
                            <MaterialCommunityIcons name="calendar" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                            {!selectedDate ? 
                            <View style={styles.selectDateTimeDetailsSection}>
                                <ThemedText>{t('select.date')}</ThemedText>
                                <ThemedText></ThemedText>
                            </View>:
                            <View style={styles.selectDateTimeDetailsSection}>
                                <ThemedText>{t('event.date')}</ThemedText>
                                <ThemedText>{moment(selectedDate).format('L')}</ThemedText>
                            </View>}
                        </TouchableOpacity>
                        <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'},styles.selectDateTimeButton]} onPress={()=> handleOpenDateTimeModal('time')}>
                            <Feather name="clock" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                            {!selectedTime ? 
                            <View style={styles.selectDateTimeDetailsSection}>
                                <ThemedText>{t('select.time')}</ThemedText>
                                <ThemedText></ThemedText>
                            </View>:
                            <View style={styles.selectDateTimeDetailsSection}>
                                <ThemedText>{t('event.time')}</ThemedText>
                                <ThemedText>{moment(selectedTime).format('LT')}</ThemedText>
                            </View>}
                        </TouchableOpacity>
                    </ThemedView>
                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationSection]}>
                        <ThemedText>{t('event.duration')}</ThemedText>
                        <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationInputSection]}>
                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationInput]}>
                                <ThemedText>{t('days')}</ThemedText>
                                <TextInput  placeholder={t('days')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} value={days.toString()} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},]} keyboardType='numeric' onChangeText={(e)=> setDays(Number(e))}/>
                        
                            </ThemedView>
                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationInput]}>
                                <ThemedText>{t('hours')}</ThemedText>
                                <TextInput  placeholder={t('hours')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} value={hours.toString()} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},]} onChangeText={(e)=> setHours(Number(e))} keyboardType='numeric'/>
                            </ThemedView>
                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationInput]}>
                                <ThemedText>{t('minutes')}</ThemedText>
                                <TextInput placeholder={t('minutes')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} value={minutes.toString()} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},]} onChangeText={(e)=> setMinutes(Number(e))} keyboardType='numeric'/>
                            </ThemedView>
                            
                        </ThemedView>
                    </ThemedView>

                    {ticketPriceArray.map((item, i)=> {

                        const parsedItem = JSON.parse(item)

                        return(

                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ticketSection]} key={i}>
                                {ticketPriceArray.length > 1 ? 
                                <ThemedView style={styles.ticketCloseView}>
                                    <View></View>
                                    <TouchableOpacity onPress={()=> handleRemoveTicketOption(Number(i))}><AntDesign name='close' size={20} color={'black'} /></TouchableOpacity>
                                </ThemedView>: null}
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ticketTitleSection]}>
                                    <ThemedText>{t('ticket.title')}</ThemedText>
                                    <ThemedText style={styles.ageDetailsText}>{t('eg.vip.regular.economy')}</ThemedText>
                                    
                                </ThemedView>
                                <TextInput value={parsedItem.ticketTitle} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.ticketTitleInput]} placeholder={t('eg.vip.regular.economy')} onChangeText={(e)=> handleChangeTicketArrayInput('ticketTitle', e, i)}/>
                                    <ThemedText style={styles.ticketNumberHeader}>{t('ticket.number')}</ThemedText>
                                <TextInput value={parsedItem.ticketNumber.toString()} placeholder={t('ticket.number')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} keyboardType='numeric' style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},styles.ticketNumberInput]} onChangeText={(e)=> handleChangeTicketArrayInput('ticketNumber', Number(e), i)}/>
                            
                        
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventPriceDetailsHeader]}>
                                    <ThemedText>{t('event.price')}</ThemedText>
                                    <ThemedText style={styles.eventPriceDetailsText}>{`(${t('if.free.enter.o')})`}</ThemedText>
                                </ThemedView>
                                
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.priceComponent]}>
                                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ageAndDetailsSection]}>
                                        <ThemedText >{t('adult')}</ThemedText>
                                        <ThemedText style={styles.ageDetailsText}>18+</ThemedText>
                                    </ThemedView>
                                    <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.priceInput]} value={parsedItem.adultPrice.toString()} placeholder={t('adult.price')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} keyboardType='numeric' onChangeText={(e)=> handleChangeTicketArrayInput('adultPrice', Number(e), i)} />
                                </ThemedView>
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.priceComponent]}>
                                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ageAndDetailsSection]}>
                                        <ThemedText >{t('adolescent')}</ThemedText>
                                        <ThemedText style={styles.ageDetailsText}>13 - 17</ThemedText>
                                    </ThemedView>
                                    <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.priceInput]} value={parsedItem.adolescentPrice.toString()} placeholder={t('adolescent.price')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} keyboardType='numeric' onChangeText={(e)=> handleChangeTicketArrayInput('adolescentPrice', Number(e), i)} />
                                </ThemedView>
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.priceComponent]}>
                                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ageAndDetailsSection]}>
                                        <ThemedText >{t('child')}</ThemedText>
                                        <ThemedText style={styles.ageDetailsText}>0 - 12</ThemedText>
                                    </ThemedView>
                                    <TextInput style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'}, styles.priceInput]} value={parsedItem.childPrice.toString()} placeholder={t('child.price')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} keyboardType='numeric' onChangeText={(e)=> handleChangeTicketArrayInput('childPrice', Number(e), i)} />
                                </ThemedView>
                            </ThemedView>

                        )
                    })}
                    {selectedDateError ? <ThemedText style={styles.errorText}>{t('event.date.required')}</ThemedText>: null}
                    {selectedTimeError ? <ThemedText style={styles.errorText}>{t('event.time.required')}</ThemedText>: null}
                    {durationError ? <ThemedText style={styles.errorText}>{t('event.duration.required')}</ThemedText>: null}
                    <ThemedView style={styles.addTicketOptionSection}>
                        <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addTicketOptionButton]} onPress={()=> handleAddTicketOption()}>
                            <AntDesign name='plussquareo' color={ colorScheme === 'dark' ? "white" : "black"} size={24} />
                            <ThemedText>{t('add.another.ticket.option')}</ThemedText>
                        </TouchableOpacity>
                    </ThemedView>
                    
                    {showDateModal ? <RNDateTimePicker value={date} mode={mode} minimumDate={new Date()} onChange={(event, date)=>handleChangeDate(event, date)}/>: null}

                    {editForm ? 
                    <ThemedView style={styles.saveComponent}>
                        <TouchableOpacity onPress={()=> handleSaveEdit()} style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.saveButton]}>
                            <View style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.plusSection]}>
                                <AntDesign name="plussquareo" size={24} color="white" />
                            </View>
                            <View style={styles.saveTextSection}>
                                <ThemedText style={styles.saveText} type='boldSmallTitle'>{t('edit')}</ThemedText>
                            </View>
                            
                        </TouchableOpacity>
                    </ThemedView>
                    :
                    <ThemedView style={styles.saveComponent}>
                        <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.saveButton]} onPress={()=> handleAddDatePriceItem()}>
                            <View style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.plusSection]}>
                                <AntDesign name="plussquareo" size={24} color="white" />
                            </View>
                            <View style={styles.saveTextSection}>
                                <ThemedText style={styles.saveText} type='boldSmallTitle'>{t('save')}</ThemedText>
                            </View>
                            
                        </TouchableOpacity>
                    </ThemedView>}
                        
                </ThemedView> : null} 

                {dateTimePrice.map((item, i)=> {

                    const parsedItem = JSON.parse(item)

                    return(
                        <ThemedView style={[colorScheme === 'dark' ? {borderColor: 'white'} : {borderColor: 'gray'}, styles.container]} key={i}>
                            <ThemedView style={styles.ticketCloseView}>
                                    <View></View>
                                    <TouchableOpacity style={styles.editButton} onPress={()=> handleOpenEditForm(parsedItem, i)}>
                                        <ThemedText style={styles.editText}>{t('edit')}</ThemedText>
                                        <Feather name='edit' size={24} color={'#1184e8'} />
                                    </TouchableOpacity>
                                </ThemedView>
                            <ThemedView style={styles.dateTimeSection}>
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.selectDateTimeButton]} >
                                    <MaterialCommunityIcons name="calendar" size={24} color={ colorScheme === 'dark' ? "white" : "black"} />
                                
                                    <View style={styles.selectDateTimeDetailsSection}>
                                        <ThemedText>{t('event.date')}</ThemedText>
                                        <ThemedText>{moment(parsedItem.eventDate).format('L')}</ThemedText>
                                    </View>
                                </ThemedView>
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.selectDateTimeButton]} >
                                    <Feather name="clock" size={24} color={ colorScheme === 'dark' ? "white" : "black"}/>
                                
                                    <View style={styles.selectDateTimeDetailsSection}>
                                        <ThemedText>{t('event.duration')}</ThemedText>
                                        <ThemedText>{moment(parsedItem.eventDate).format('LT')}</ThemedText>
                                    </View>
                                </ThemedView>
                            </ThemedView>
                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationSection]}>
                                <ThemedText>{t('event.duration')}</ThemedText>
                                <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationInputSection]}>
                                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'},styles.eventDurationInput]}>
                                        <ThemedText>{t('days')}</ThemedText>
                                        <ThemedText>{parsedItem.eventDays}</ThemedText>
                                
                                    </ThemedView>
                                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationInput]}>
                                        <ThemedText>{t('hours')}</ThemedText>
                                        <ThemedText>{parsedItem.eventHours}</ThemedText>
                                    </ThemedView>
                                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventDurationInput]}>
                                        <ThemedText>{t('minutes')}</ThemedText>
                                        <ThemedText>{parsedItem.eventMinutes}</ThemedText>
                                    </ThemedView>
                                    
                                </ThemedView>
                            </ThemedView>

                            {parsedItem.ticketPriceArray.map((item, i)=> {

                                return(
                                    <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ticketSection]} key={i}>
                                        
                                        <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ticketTitleSection]}>
                                            <ThemedText>{t('ticket.title')}</ThemedText>
                                        </ThemedView>
                                        <ThemedText>{item.ticketTitle}</ThemedText>
                                        <ThemedText style={styles.ticketNumberHeader}>{t('ticket.number')}</ThemedText>
                                        <ThemedText>{item.ticketNumber}</ThemedText>
                                       
                                    
                                
                                        <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.eventPriceDetailsHeader]}>
                                            <ThemedText>{t('event.price')}</ThemedText>
                                            
                                        </ThemedView>
                                        
                                        <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.priceComponent]}>
                                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ageAndDetailsSection]}>
                                                <ThemedText >{t('adult')}</ThemedText>
                                                <ThemedText style={styles.ageDetailsText}>18+</ThemedText>
                                            </ThemedView>
                                            <ThemedText>{item.adultPrice}</ThemedText>
                                        </ThemedView>
                                        <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.priceComponent]}>
                                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'},styles.ageAndDetailsSection]}>
                                                <ThemedText >{t('adolescent')}</ThemedText>
                                                <ThemedText style={styles.ageDetailsText}>13 - 17</ThemedText>
                                            </ThemedView>
                                            <ThemedText>{item.adolescentPrice}</ThemedText>
                                        </ThemedView>
                                        <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.priceComponent]}>
                                            <ThemedView style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.ageAndDetailsSection]}>
                                                <ThemedText >{t('child')}</ThemedText>
                                                <ThemedText style={styles.ageDetailsText}>0 - 12</ThemedText>
                                            </ThemedView>
                                            <ThemedText>{item.childPrice}</ThemedText>
                                        </ThemedView>
                                    </ThemedView>
                                )
                            })}
                        </ThemedView>
                    )
                })}
                    {!showForm ? 
                    <ThemedView>
                        {dateTimePrice.length > 0 ? 
                            <ThemedView style={styles.addTicketOptionSection}>
                                <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addTicketOptionButton]} onPress={()=> handleAddDateTimeComponent()}>
                                    <AntDesign name='plussquareo' color={ colorScheme === 'dark' ? "white" : "black"} size={24} />
                                    <ThemedText>{t('add.another.date.and.time')}</ThemedText>
                                </TouchableOpacity>
                            </ThemedView>: null
                        }
                    </ThemedView> 
                    : null}
                </ThemedView>
                
            </ScrollView>   
        </ThemedView>  
        
    )
}

const styles = StyleSheet.create({
    body: {
        marginBottom: 200
    },
    container: {
        marginTop: 10,
        borderWidth: 0.5,
        padding: 5,
        
    
    },
    dateTimeSection: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        marginTop: 10

    },
    selectDateTimeButton: {
        borderWidth: 0.5,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 10,
        flexDirection: 'row',
        width: '45%',
        margin: 5
    },
    selectDateTimeDetailsSection: {
        marginLeft: 5
    },
    closeFormSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eventDurationSection: {
        borderWidth: 0.5,
        borderColor: 'gray',
        margin: 5,
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    },
    eventDurationInputSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:5
    },
    eventDurationInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        width: '25%',
        marginRight: 20,
        paddingHorizontal: 5
    },
    priceSection: {
        borderWidth: 0.5,
        borderColor: 'gray',
        margin: 5,
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    },
    ticketSection: {
        borderWidth: 0.5,
        borderColor: 'gray',
        margin: 5,
        padding: 10,
        marginTop: 10,
        borderRadius: 10
    },
    ageDetailsText: {
        color: 'gray',
        marginLeft: 5
      },
      ageAndDetailsSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
      },
      priceComponent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
      },
      priceInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        paddingHorizontal: 5,
        width: '50%'
      },
      ticketTitleSection: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      ticketTitleInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        width: '90%',
        marginTop: 5,
        padding: 5    
      },
      ticketNumberInput: {
        borderWidth: 0.5,
        borderColor: 'gray',
        width: '30%',
        marginTop: 5,
        padding: 5    
      },
      ticketNumberHeader: {
        marginTop: 5
      },
      saveButton:{
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        flexDirection: 'row',
        width: '50%',
        backgroundColor: '#1184e8'
        
      },
      saveComponent: {
        alignItems: 'center',
        marginVertical: 10,
       
        
      },
      plusSection: {
        
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderTopLeftRadius:5,
        borderBottomLeftRadius: 5
      },
      saveTextSection:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1184e8',
        
      },
      saveText:{
        marginLeft: 20
      },
      eventPriceDetailsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
      },
      eventPriceDetailsText: {
        color: 'gray',
        marginLeft: 5
      },
      errorText: {
        color: 'red',
        marginTop: 10
      },
      addTicketOptionSection: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 5,
        
      },
      addTicketOptionButton: {
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 10
      },
      ticketCloseView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
      },
      editButton: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      editText:{
        marginRight: 5
      }
     
   
})