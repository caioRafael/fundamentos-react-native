import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Participant } from "../../components/Participant";
import { useState } from "react";

export default function Home(){

    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState<string>('')

    const handleParticipantAdd = () => {
        if(participants.includes(participantName)){
           return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome!")
        }

        setParticipants(state => [...state, participantName])
        setParticipantName('')
    }

    const handleParticipantRemove = (name: string) => {
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: 'Sim',
                onPress: () => {
                    setParticipants(participants.filter(participant => participant !== name))
                    Alert.alert('Deletado!')
                }
            },
            {
                text: 'Não',
                style: "cancel"
            }
        ])
        console.log(`Você clicou no botao de remover ${name}!`)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.eventName}>
                Nome do evento
            </Text>
            <Text style={styles.eventDate}>
                segunda, 9 de Dezembro de 2024.
            </Text>

            <View style={styles.form}>
                <TextInput 
                    style={styles.input}
                    placeholder="Nome do participante"
                    placeholderTextColor={'#6b6b6b'}
                    accessibilityLabel="Nome do participante"
                    value={participantName}
                    onChangeText={setParticipantName}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={handleParticipantAdd}
                >
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Participant 
                        key={item} 
                        name={item} 
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />
 
        </View>
    )
}