import {useState, useEffect} from 'react'

import { Image, StyleSheet, Platform, Dimensions, SafeAreaView, TextInput, Pressable, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons, Foundation, MaterialIcons, FontAwesome5, Entypo, Feather } from '@expo/vector-icons'; 
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {AntDesign} from '@expo/vector-icons';
import EventBody from '@/components/appComponents/EventBody';
import { Link } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';
import EventHeader from '@/components/appComponents/EventHeader';
import EventScreenBody from '@/components/appComponents/EventScreenBody';
import ProfileHeader from '@/components/appComponents/ProfileHeader';
import {useLanguage} from '../../../context/LanguageContext'
import {useAdmin} from '../../../context/TchebaaAdminContext'
import {useUser} from '../../../context/UserContext'
import { useColorScheme } from '@/hooks/useColorScheme';
import { generateClient } from 'aws-amplify/data';
import {type Schema} from '../../../tchebaa-backend/amplify/data/resource'


const client = generateClient<Schema>();



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height




export default function AllAdmins() {

    const {t, handleChangeLanguage, currentLanguageCode} = useLanguage()
    const [pageType, setPageType] = useState<string>(t('all.administrators'))
    const {admins, handleGetAdmins, loadingAdmins} = useAdmin()
    const {userDetails} = useUser()
    const colorScheme = useColorScheme();

    const [email, setEmail] = useState<string>('')
    const [emailError, setEmailError] = useState<boolean>(false)
    const [adminName, setAdminName] = useState<string>('')
    const [adminNameError, setAdminNameError] = useState<boolean>(false)
    const [adminMode, setAdminMode] = useState<string>('add')
    const [adminId, setAdminId] = useState<string>('')

    const [postEventPermissions, setPostEventPermissions] = useState<boolean>(true)
    const [deleteEventPermissions, setDeleteEventPermissions] = useState<boolean>(true)
    const [editEventPermissions, setEditEventPermissions] = useState<boolean>(true)
    const [ticketCancelPermissions, setTicketCancelPermissions] = useState<boolean>(true)
    const [chatPermissions, setChatPermissions] = useState<boolean>(true)
    const [addAdminPermissions, setAddAdminPermissions] = useState<boolean>(true)
    const [editAdminPermissions, setEditAdminPermissions] = useState<boolean>(true)
    const [deleteAdminPermissions, setDeleteAdminPermissions] = useState<boolean>(true)

    const [openAddAdmin, setOpenAddAdmin] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    const [loadingAddAdmin, setLoadingAddAdmin] = useState<boolean>(false)
    const [loadingDeleteAdmin, setLoadingDeleteAdmin] = useState<boolean>(false)
    const [deleteAdminError, setDeleteAdminError] = useState<boolean>(false)
    const [addAdminError, setAddAdminError] = useState<boolean>(false)

   


    const admin = admins?.find((admin)=> admin.email === userDetails?.username)

    interface IAdmin {
        id?: string;
        email?:string;
        adminName?:string;
        postEventPermissions?: boolean;
        deleteEventPermissions?:boolean;
        editEventPermissions?:boolean;
        ticketCancelPermissions?:boolean;
        chatPermissions?:boolean;
        addAdminPermissions?: boolean;
        editAdminPermissions?: boolean;
        deleteAdminPermissions?: boolean;
      }

    const handleAddAdmin = async () => {


        if(email.length > 1) {


            setEmailError(false)


            if(adminName.length > 1) {

                setAdminNameError(false)

                setLoadingAddAdmin(true)
                setAddAdminError(false)

                try{

                    const { data, errors } = await client.models.Admin.create({
                        email: email,
                        adminName: adminName,
                        postEventPermissions: postEventPermissions,
                        deleteEventPermissions: deleteEventPermissions,
                        ticketCancelPermissions: ticketCancelPermissions,
                        addAdminPermissions: addAdminPermissions,
                        editAdminPermissions: editAdminPermissions,
                        deleteAdminPermissions: deleteAdminPermissions,
                        chatPermissions: chatPermissions,
                        editEventPermissions: editAdminPermissions
                    })
    
                    setLoadingAddAdmin(false)
                    setOpenAddAdmin(false)
                    handleGetAdmins()
        
                } catch(e) {
    
                    setAddAdminError(true)
                    setLoadingAddAdmin(false)
        
                }

            } else {
                setAdminNameError(true)
            }

            
            

        } else {

            
            setEmailError(true)

        }


        

    }


    const handleEditAdmin = async () => {

        if(email.length > 1) {


            setEmailError(false)


            if(adminName.length > 1) {

                setAdminNameError(false)

                setLoadingAddAdmin(true)
                setAddAdminError(false)

                try{

                    const { data, errors } = await client.models.Admin.update({
                        id: adminId,
                        email: email,
                        adminName: adminName,
                        postEventPermissions: postEventPermissions,
                        deleteEventPermissions: deleteEventPermissions,
                        ticketCancelPermissions: ticketCancelPermissions,
                        addAdminPermissions: addAdminPermissions,
                        editAdminPermissions: editAdminPermissions,
                        deleteAdminPermissions: deleteAdminPermissions,
                        chatPermissions: chatPermissions,
                        editEventPermissions: editAdminPermissions
                    })
    
                    setLoadingAddAdmin(false)
                    setOpenAddAdmin(false)
                    handleGetAdmins()
        
                } catch(e) {
    
                    setAddAdminError(true)
                    setLoadingAddAdmin(false)
        
                }

            } else {
                setAdminNameError(true)
            }

            
            

        } else {

            
            setEmailError(true)

        }


    }

    const handleDeleteAdmin = async () => {

        setLoadingDeleteAdmin(true)
        setDeleteAdminError(false)

        try{

            const { data, errors } = await client.models.Admin.delete({
                id: adminId
            })

            setLoadingDeleteAdmin(false)
            setOpenDeleteModal(false)
            setAdminId('')
            setEmail('')
            setAdminName('')
            handleGetAdmins()

        } catch(e) {

            setDeleteAdminError(true)
            setLoadingDeleteAdmin(false)
            setOpenDeleteModal(false)

        }
    }


    const handleOpenAdminEdit = (item: IAdmin) => {


        setOpenDeleteModal(false)
        setAdminId(item.id)
        setAdminMode('edit')
        setEmail(item.email)
        setAdminName(item.adminName)
        setPostEventPermissions(item.postEventPermissions)
        setDeleteEventPermissions(item.deleteEventPermissions)
        setTicketCancelPermissions(item.ticketCancelPermissions)
        setAddAdminPermissions(item.addAdminPermissions)
        setEditAdminPermissions(item.editAdminPermissions)
        setChatPermissions(item.chatPermissions)
        setDeleteAdminPermissions(item.deleteAdminPermissions)
        setEditEventPermissions(item.editAdminPermissions)

        setOpenAddAdmin(true)

    }

    const handleCloseAddAdminModal = () => {

        setAdminMode('add')
        setAdminId('')
        setEmail('')
        setAdminName('')
        setPostEventPermissions(true)
        setDeleteEventPermissions(true)
        setTicketCancelPermissions(true)
        setAddAdminPermissions(true)
        setEditAdminPermissions(true)
        setChatPermissions(true)
        setDeleteAdminPermissions(true)
        setEditEventPermissions(true)
        setOpenAddAdmin(false)

    }

    const handleOpenDeleteModal = (item: IAdmin) => {

        setOpenAddAdmin(false)
        setOpenDeleteModal(true)
        setAdminId(item.id),
        setAdminName(item.adminName)
        setEmail(item.email)
        
    }

    const handleCloseDeleteModal = () => {

        setOpenDeleteModal(false)
        setEmail('')
        setAdminName('')
        setAdminId('')
    }


  

  return (
    <SafeAreaView style={styles.container}>
        <ThemedView style={styles.body}>
            <ProfileHeader pageType={pageType}/>
            {admin?.addAdminPermissions ? <ThemedView style={styles.addAdministratorButton}>
                <TouchableOpacity onPress={()=> {setOpenAddAdmin(true); setOpenDeleteModal(false)}}>
                    <ThemedText>{t('add.administrator')}</ThemedText>
                </TouchableOpacity>
            </ThemedView>: null}
            {openDeleteModal ? 
            <ThemedView style={styles.addAdministratorModal}>

                <ThemedView style={styles.closeModalSection}>
                    <ThemedView></ThemedView>
                    <TouchableOpacity onPress={()=> handleCloseDeleteModal()}><AntDesign name='close' size={24} color={ colorScheme === 'dark' ? "white" : "black"}  /></TouchableOpacity>
                </ThemedView>
                <ThemedText>{t('delete')}</ThemedText>
                <ThemedText>{adminName}</ThemedText>
                <ThemedText>{email}</ThemedText>
                {loadingDeleteAdmin ? 
                <ThemedView style={styles.loadingDeleteModal}>
                    <ActivityIndicator/>
                    <ThemedText>{t('deleting')}</ThemedText>
                    
                </ThemedView>
                :
                null}
                
                <ThemedView>
                    {loadingDeleteAdmin ? 
                    <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addButton]} >
                        <ThemedText>{t('delete')}</ThemedText>
                    </TouchableOpacity>:
                    <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addButton]} onPress={()=> handleDeleteAdmin()}>
                        <ThemedText>{t('delete')}</ThemedText>
                    </TouchableOpacity>}
                </ThemedView>

            </ThemedView>
            : null}
           { openAddAdmin ? 
            <ThemedView style={styles.addAdministratorModal}>
                <ThemedView style={styles.closeModalSection}>
                    <ThemedView></ThemedView>
                    <TouchableOpacity onPress={()=> handleCloseAddAdminModal()}><AntDesign name='close' size={24} color={ colorScheme === 'dark' ? "white" : "black"}  /></TouchableOpacity>
                </ThemedView>
                {loadingAddAdmin ? 
                <ThemedView style={styles.loadingAddModal}>
                    <ActivityIndicator/>
                    {adminMode === 'add' ? <ThemedText>{t('uploading')}</ThemedText>
                    : <ThemedText>{t('update')}</ThemedText>}
                </ThemedView>
                :
                null}
                <TextInput placeholder={t('email')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},  styles.inputContainer]} value={email} onChangeText={(e)=> setEmail(e)}/>
                {emailError ? <ThemedText style={styles.errorText}>{t('email.required')}</ThemedText>: null}
                <TextInput placeholder={t('name')} placeholderTextColor={ colorScheme === 'light' ? 'gray': 'white'} style={[colorScheme === 'dark' ? {backgroundColor: '#202020', color: 'white'} : {backgroundColor: 'white', color:'black'},  styles.inputContainer]} value={adminName} onChangeText={(e)=> setAdminName(e)}/>
                {adminNameError ? <ThemedText style={styles.errorText}>{t('name.is.required')}</ThemedText>: null}
                <ThemedView style={styles.permissionsContainer}>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setPostEventPermissions(!postEventPermissions)}>
                            {postEventPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('post.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setDeleteEventPermissions(!deleteEventPermissions)}>
                            {deleteEventPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('delete.event.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setEditEventPermissions(!editEventPermissions)}>
                            {editEventPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('edit.event.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setTicketCancelPermissions(!ticketCancelPermissions)}>
                            {ticketCancelPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('ticket.cancel.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setChatPermissions(!chatPermissions)}>
                            {chatPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('chat.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setAddAdminPermissions(!addAdminPermissions)}>
                            {addAdminPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('add.admin.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setEditAdminPermissions(!editAdminPermissions)}>
                            {editAdminPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('edit.admin.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.permissionBody} onPress={()=> setDeleteAdminPermissions(!deleteAdminPermissions)}>
                            {deleteAdminPermissions ?
                                <MaterialCommunityIcons name='radiobox-marked' size={16} color={'#1184e8'}/>
                                :
                            <MaterialCommunityIcons name='radiobox-blank' size={16} color={ colorScheme === 'dark' ? "white" : "black"}/>}
                            <ThemedText style={styles.permissionTitle}>{t('delete.admin.permissions')}</ThemedText>
                            
                        </TouchableOpacity>
                       {adminMode === 'add' ? 
                        <ThemedView>
                            {loadingAddAdmin ? 
                            <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addButton]} >
                                <ThemedText>{t('add.administrator')}</ThemedText>
                            </TouchableOpacity>:
                            <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addButton]} onPress={()=> handleAddAdmin()}>
                                <ThemedText>{t('add.administrator')}</ThemedText>
                            </TouchableOpacity>}
                        </ThemedView>
                        :
                        <ThemedView>
                            {loadingAddAdmin ? 
                            <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addButton]} >
                                <ThemedText>{t('update')}</ThemedText>
                            </TouchableOpacity>:
                            <TouchableOpacity style={[colorScheme === 'dark' ? {backgroundColor: '#202020'} : {backgroundColor: 'white'}, styles.addButton]} onPress={()=> handleEditAdmin()}>
                                <ThemedText>{t('update')}</ThemedText>
                            </TouchableOpacity>}
                        </ThemedView>}
                </ThemedView>
            </ThemedView>: null}
            <ThemedView style={styles.adminListContainer}>
                {loadingAdmins ? 
                <ActivityIndicator/>:
                <ThemedView>
                    {admins?.map((item, i)=> {
                        return(
                            
                            <ThemedView key={i} style={styles.adminItem}>
                                <ThemedText>{item.adminName}</ThemedText>
                                <ThemedText>{item.email}</ThemedText>
                                <ThemedView style={styles.editDeleteContainer}>
                                    <TouchableOpacity style={styles.editDeleteButtons} onPress={()=> handleOpenAdminEdit(item)}><ThemedText>Edit</ThemedText></TouchableOpacity>
                                    <TouchableOpacity style={styles.editDeleteButtons} onPress={()=> handleOpenDeleteModal(item)}><ThemedText>Delete</ThemedText></TouchableOpacity>
                                </ThemedView>
                            </ThemedView>
                            
                        )
                    })}
                </ThemedView>
                }
            </ThemedView>
        </ThemedView>
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        paddingTop: Platform.OS === "android" ? 20 : 0,
        marginTop:10,
        width: windowWidth,
        
        
    },
    body: {
        width: windowWidth * 0.95,
        
        
        alignItems: 'center',
        
    },
    
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        justifyContent: 'space-between',
        width: '100%',
        paddingBottom: 10,
        marginTop: 20,
        borderColor: 'gray'
    },
    buttonText: {
        marginRight: 5
    },
    addAdministratorButton: {
        borderWidth: 0.5,
        marginTop: 10,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 10
    },
    inputContainer: {
        borderWidth: 0.5,
        fontFamily:"default",
        width: '95%',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        
        
      },
      addAdministratorModal: {
        width: windowWidth * 0.95,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        padding: 10,
        position: 'absolute',
        top: 50,
        zIndex: 20
      },
      closeModalSection: {
        width: '95%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
      permissionBody: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: windowWidth * 0.95,
        padding: 5,
        borderColor: 'gray'
      },
      permissionTitle: {
        marginHorizontal: 5
      },
      permissionsContainer: {
        width: '95%'
      },
      errorText: {
        margin: 5,
        color: 'red'
      },
      addButton: {
        borderWidth: 1,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        borderRadius:5,
        borderColor: '#1184e8',
        fontFamily: "PoppinsSemibold"
      },
      loadingAddModal: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 200,
        width: '90%',
        height: 200,
        zIndex: 20
      },
      loadingDeleteModal: {
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 20,
        width: '90%',
        height: 100,
        zIndex: 20
      },
      adminListContainer: {
        width: '95%',
        marginTop: 10
      },
      adminItem: {
        borderWidth: 0.5,
        borderColor: 'gray',
        padding: 10,
        marginTop: 10
      },
      editDeleteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10
      },
      editDeleteButtons: {
        paddingHorizontal: 5,
        borderWidth: 0.5,
        borderColor: 'gray',
        borderRadius: 5
      }
  
  
  
  
});