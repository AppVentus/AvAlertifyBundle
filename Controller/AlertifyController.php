<?php

namespace AppVentus\Awesome\AlertifyBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppVentus\Awesome\AlertifyBundle\Twig\Extension\AlertifyExtension;

use AppVentus\Awesome\ShortcutsBundle\Utils\Utils ;

/**
 * AdManager controller.
 * @Route("/alertify")
 */
class AlertifyController extends Controller {
    /**
     * @Route("/confirm", name="Alertify_Confirm")
     * @Template("AvAwesomeAlertifyBundle:Modal:confirm.html.twig")
     **/
    public function ConfirmAction() {
        $request = $this->get('request');
        return array(
            'title'=>$request->get('title'),
            'body'=>$request->get('body'),
            'id'=>$request->get('id').rand(1,100)."-modal",
            'cancel_button_class'=>$request->get('cancel_button_class', "btn-cancel"),
            'confirm_button_class'=>$request->get('confirm_button_class', "btn-primary"),
            'type' => $request->get('type')
        );
    }/**
     * @Route("/ajax", name="Alertify_Ajax")
     * @Template("AvAwesomeAlertifyBundle:Modal:ajax.html.twig")
     **/
    public function AjaxAction() {
        $request = $this->get('request');
        $options = array();
        foreach($request->request->all() as $name => $option){
            $options[$name] = $option;
        }
        $this->get('session')->getFlashBag()->add($options['main_type'], $options);
        return array();
    }
}
