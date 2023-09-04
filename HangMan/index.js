const HangmanList = [
  [
    "  +---+",
    "  |   |",
    "      |",
    "      |",
    "      |",
    "      |",
    "========="
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    "      |",
    "      |",
    "      |",
    "========="
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    "  |   |",
    "      |",
    "      |",
    "========="
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " \\|   |",
    "      |",
    "      |",
    "========="
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " \\|/  |",
    "      |",
    "      |",
    "========="
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " \\|/  |",
    " \\    |",
    "      |",
    "========="
  ],
  [
    "  +---+",
    "  |   |",
    "  O   |",
    " \\|/  |",
    " \\ /  |",
    "      |",
    "========="
  ]
];
const WordsList = ['Esmail', 'Mohammed', 'Hossam', 'Eyad', 'Ahmed', 'Computer', 'IS'];


function Game()
{
  let RandomWord = WordsList[Math.floor(Math.random() * WordsList.length)];
  let Choosed = Array(RandomWord.length).fill('_');
  let Counter = 0;

  DrawHangman(Counter);
  FillWordContainer(Choosed);
  const GuessInput = document.getElementById('GuessInput');
  GuessInput.focus();

  const GuessButton = document.getElementById('GuessButton');
  GuessButton.addEventListener('click', () =>
  {
    if (Counter >= 0 && Counter < 6)
    {
      const GuessInput = document.getElementById('GuessInput');
      const Guess = GuessInput.value.toLowerCase();
      
      if(Guess.length == 1)
      {
        if (RandomWord.toLowerCase().includes(Guess) == true)
        {
          let RandomWordLower = RandomWord.toLowerCase();
          let Indexes = [];
          let Index = RandomWordLower.indexOf(Guess);
          while (Index !== -1) {
            Indexes.push(Index);
            Index = RandomWordLower.indexOf(Guess, Index + 1);
          }
          if ((Choosed.includes(Guess)) == true ||
              (Choosed.includes(Guess.toUpperCase())) == true)
          {
            ShowMessage("لقد قمت بتخمينه من قبل 😅");
          }
          else
          {
            ShowMessage("تخمين صحيح 👍", "green");
          }
          for (var i = 0; i< Indexes.length; i++)
          {
            Choosed[Indexes[i]] = RandomWord[Indexes[i]];
          }
          FillWordContainer(Choosed);
          if (Choosed.includes("_"))
          {
            GuessInput.value = "";
            GuessInput.focus();
          }
          else
          {
            GuessInput.value = "";
            GuessInput.disabled = true;
            GuessButton.disabled = true;
            const InputContainer = document.getElementById('InputContainer'); 
            InputContainer.remove();
            ShowMessage(" لقد فزت 😊 ، قم بالضغط على إعادة لإعادة اللعب.", "green");
          }
        }
        else
        {
          Counter += 1;
          GuessInput.value = "";
          DrawHangman(Counter);
          if (Counter == 6)
          {
            GuessInput.disabled = true;
            GuessButton.disabled = true;
            const InputContainer = document.getElementById('InputContainer'); 
            InputContainer.remove();
            ShowMessage(" لقد خسرت 😌 ، قم بالضغط على إعادة لإعادة اللعب.");
          }
          else
          {
            GuessInput.focus();
            ShowMessage("تخمين غير صحيح 👎 ، تبقى لديك: " + (6 - Counter) + " محاولة.");
          }
        }
      }
      else
      {
        ShowMessage("قم بإدخال حرف.");
        GuessInput.focus();
      }
    }
    else
    {
      ShowMessage("لقد خسرت 😌 ولم يتبقى لديك أي محاولة.\n قم بالضغط على إعادة لإعادة اللعب.")
    }
  });

  GuessInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      GuessButton.click();
    }
  });

  const RestartButton = document.getElementById('RestartButton');
  RestartButton.addEventListener('click', () => {
      location.reload();
    }
  );
}


function DrawHangman(Counter)
{
  const HangmanDrawing = document.getElementById('HangmanDrawing');
  HangmanDrawing.innerHTML = HangmanList[Counter][0] +
                            "\n" + HangmanList[Counter][1] +
                            "\n" + HangmanList[Counter][2] +
                            "\n" + HangmanList[Counter][3] +
                            "\n" + HangmanList[Counter][4] +
                            "\n" + HangmanList[Counter][5];
}


function FillWordContainer(Choosed)
{
  const WordContainer = document.getElementById("WordContainer");
  var String = ""
  for (i = 0; i<Choosed.length; i++)
  {
    String += Choosed[i];
  }
  WordContainer.innerHTML = String;
}


function ShowMessage(message, color="red") {
  const Message = document.getElementById('Message');
  Message.textContent = message;
  Message.style.color = color;
}



/////////////////////////////////////////////////////////////////////////////
Game();
/////////////////////////////////////////////////////////////////////////////