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


  entrada = fopen(argv[INPUTFILE], "r");
  aux = 'a';
  while(fscanf(entrada, "%c", &aux2) != EOF && (aux != '%' || aux2 != '%')){
    aux = aux2;
  }
  while(fscanf(entrada, "%c", &aux2) != EOF && aux2 != '<'){} //pegando os lixos


  strcat(nome, argv[1]);

  saida = fopen(nome, "w");
  fprintf(saida, "<");
  while(fscanf(entrada, "%c", &aux) != EOF){
    fprintf(saida, "%c", aux);
  }

  printf("Arquivo gerado com sucesso\n");
  fclose(entrada);
  fclose(saida);
  return 0;
}
