#include <stdio.h>
#include <string.h>

enum{
  PROGNAME,
  INPUTFILE,
  NARGS
};

int main(int argc, char const *argv[]) {
  FILE *entrada, *saida;
  char aux , aux2, nome[200] = "single/s-";

  if(argc != NARGS){
    printf("Escreva o nome do arquivo\n");
    return -1;
  }

  strcat(nome, argv[1]);

  entrada = fopen(argv[INPUTFILE], "r");
  while(fscanf(entrada, "%c%c", &aux, &aux2) != EOF && aux != '%' && aux2 != '%'){}
  fscanf(entrada, "%c%c", &aux, &aux2); //Pegando os lixos
  fscanf(entrada, "%c%c", &aux, &aux2);
  fscanf(entrada, "%c%c", &aux, &aux2);

  saida = fopen(nome, "w");
  while(fscanf(entrada, "%c%c", &aux, &aux2) != EOF && aux != '%' && aux2 != '%'){
    fprintf(saida, "%c%c", aux, aux2);
  }
  fprintf(saida, "-->");

  printf("Arquivo gerado com sucesso\n");
  fclose(entrada);
  fclose(saida);
  return 0;
}
