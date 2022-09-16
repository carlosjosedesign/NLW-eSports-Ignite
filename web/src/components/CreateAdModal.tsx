import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';


import { CaretDown, Check, GameController } from 'phosphor-react';
import { Input } from './Form/Input';


interface Game{
  id: string,
  title: string,
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [gamesInput, setGamesInput] = useState<string>()
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setVoiceChannel]  = useState(false)
  
  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  async function handleCreateAd(event: FormEvent) {
      event.preventDefault();

      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData)

      console.log(data)

      if(!data.name){
        return;
      }

        try{
          await axios.post(`http://localhost:3333/games/${gamesInput}/ads`, {
            name: data.name,
            yearsPlaying:Number(data.yearsPlaying),
            discord: data.discord,
            weekDays: weekDays.map(Number),
            hourStart: data.hourStart,
            hourEnd: data.hourEnd,
            useVoiceChannel:useVoiceChannel,
          });
          alert('Anúncio criado com sucesso!');

        } catch (err){
          console.log(err);
          alert('Erro ao criar o anúncio!')
        }

  }

  console.log(gamesInput)

	return(
		<Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
          <Dialog.Content className="bg-[#2a2634] py-8 px-10 text-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title >
           
              <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="game" className="font-semibold">Qual o game?</label>

                    <Select.Root name="game" onValueChange={setGamesInput}>
                      <Select.Trigger className={`bg-zinc-900 py-3 px-4 rounded text-small flex justify-between ${gamesInput ? "text-white" : "text-zinc-500"}`}>
                        <Select.Value
                          placeholder="Selecione o game que deseja jogar"
                          className="text-zinc-500"
                        />
                        <CaretDown size={24} className="color-zinc-300" />
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content>
                          <Select.SelectViewport className="bg-zinc-900 py-4 text-white rounded-lg px-6">
                            <Select.SelectGroup>
                              {games.map((game) => {
                                return (
                                  <Select.SelectItem
                                  value={game.id}
                                  key={game.id}
                                  className="flex items-center justify-between mb-1 cursor-pointer rounded p-1 hover:bg-violet-300 hover:text-zinc-700 hover:border-none"
                                  >
                                    <Select.SelectItemText>{game.title}</Select.SelectItemText>
                                    <Select.SelectItemIndicator>
                                      <Check size={24} className="text-emerald-500" />
                                    </Select.SelectItemIndicator>

                                  </Select.SelectItem>
                                );
                              })}
                            </Select.SelectGroup>
                          </Select.SelectViewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Seu nome</label>
                    <Input 
                      name="name" 
                      id="name" 
                      placeholder="Como te chamam"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                      <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="discord">Qual o seu Discord?</label>
                      <Input name="discord" id="discord" placeholder="Usuario#0000" />
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex flex-col gap-2 ">
                      <label htmlFor="weekDays">Quando costuma jogar?</label>
   
                        <ToggleGroup.Root 
                        type="multiple" 
                        className="gap-2 grid grid-cols-4"
                        value={weekDays}
                        onValueChange={setWeekDays}
                        >

                          <ToggleGroup.Item
                          value="0"
                          title="Domingo"
                          className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >D
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="1"
                          title="Segunda"
                          className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >S
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="2"
                          title="Terça"
                          className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >T
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="3"
                          title="Quarta"
                          className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >Q
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="4"
                          title="Quinta"
                          className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >Q
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="5"
                          title="Sexta"
                          className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >S
                          </ToggleGroup.Item>
                          <ToggleGroup.Item
                          value="6"
                          title="Sábado"
                          className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                          >S
                          </ToggleGroup.Item>

                        </ToggleGroup.Root>
                   
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="hourStart">Qual o horário do dia</label>
                      <div className="grid grid-cols-2 gap-1">
                        <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                        <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                      </div>
                    </div>
                  </div>

                  <label className="mt-2 flex items-center gap-2 text-sm">
                    <Checkbox.Root 
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                      if(checked === true){
                        setVoiceChannel(true)
                      }else{
                        setVoiceChannel(false)
                      }
                    
                    }}
                    className="w-6 h-6 rounded bg-zinc-900 p-1">
                      <Checkbox.Indicator >
                        <Check className="w-4 h-4 text-emerald-400" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    Costumo me conectar ao chat de voz
                  </label>

                  <footer className="mt-4 flex justify-end gap-4">
                    <Dialog.Close 
                    type="button"
                    className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
                      Cancelar
                    </Dialog.Close>
                    <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600">
                      <GameController size={24}/>
                        Encontrar duo
                      </button>
                  </footer>
              </form>


          </Dialog.Content>
        </Dialog.Portal>
  )
}